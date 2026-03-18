-- Disable foreign key checks temporarily to prevent order-of-creation errors during testing
SET FOREIGN_KEY_CHECKS = 0;

-- --------------------------------------------------------
-- 1. Independent Tables (No Foreign Keys)
-- --------------------------------------------------------

CREATE TABLE users (
  uid CHAR(36) NOT NULL DEFAULT (UUID()),
  username VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  roll VARCHAR(255) NOT NULL UNIQUE,
  pass VARCHAR(255) NOT NULL, -- Optimized from TEXT
  -- enrolled_batches removed: rely on the 'orders' table for access control
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  phone VARCHAR(255) UNIQUE,
  PRIMARY KEY (uid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE admins (
  uid CHAR(36) NOT NULL DEFAULT (UUID()),
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'admin',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (uid)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE categories (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE blogs (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  title TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  category VARCHAR(255) DEFAULT 'General',
  author VARCHAR(255) DEFAULT 'Admin',
  status ENUM('draft', 'published') DEFAULT 'published',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  slug VARCHAR(255) NOT NULL UNIQUE,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------
-- 2. First-Level Dependency Tables
-- --------------------------------------------------------

CREATE TABLE files (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  original_filename VARCHAR(255) NOT NULL,
  display_name VARCHAR(255),
  category_id CHAR(36),
  uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  total_questions INT DEFAULT 0,
  external_id VARCHAR(255),
  batch_id VARCHAR(255),
  set_id VARCHAR(255),
  is_bank TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT files_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE batches (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  slug VARCHAR(255) NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  image_url TEXT,
  tags JSON DEFAULT (JSON_ARRAY()),
  order_index INT DEFAULT 0,
  is_public TINYINT(1) DEFAULT 0,
  status ENUM('live', 'ended') DEFAULT 'live',
  created_by CHAR(36),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  tasks_enabled TINYINT(1) DEFAULT 0,
  todo_start_time VARCHAR(255),
  todo_end_time VARCHAR(255),
  mandatory_start_time VARCHAR(255),
  mandatory_end_time VARCHAR(255),
  optional_start_time VARCHAR(255),
  optional_end_time VARCHAR(255),
  price DECIMAL(10, 2) DEFAULT 0.00,
  old_price DECIMAL(10, 2) DEFAULT 0.00,
  category VARCHAR(255),
  features JSON DEFAULT (JSON_ARRAY()),
  default_approval_message TEXT,
  linked_batch_ids JSON DEFAULT (JSON_ARRAY()),
  -- Changed stats from VARCHAR('0+') to INT for proper metrics
  live_exams INT DEFAULT 0,
  lecture_notes INT DEFAULT 0,
  standard_exams INT DEFAULT 0,
  solve_sheets INT DEFAULT 0,
  batch_stats JSON DEFAULT (JSON_ARRAY()),
  routine_url TEXT,
  offer_expires_at DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT batches_created_by_fkey FOREIGN KEY (created_by) REFERENCES admins(uid) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE daily_records (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  student_id CHAR(36) NOT NULL,
  exams_attempted INT DEFAULT 0,
  questions_solved INT DEFAULT 0,
  record_date DATE DEFAULT (CURRENT_DATE),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT daily_records_student_id_fkey FOREIGN KEY (student_id) REFERENCES users(uid) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE study_sessions (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  user_id CHAR(36) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  total_seconds INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT study_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(uid) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------
-- 3. Second-Level Dependency Tables
-- --------------------------------------------------------

CREATE TABLE questions (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  file_id CHAR(36) NOT NULL,
  question_text TEXT,
  option1 TEXT,
  option2 TEXT,
  option3 TEXT,
  option4 TEXT,
  option5 TEXT,
  answer VARCHAR(255),
  explanation TEXT,
  question_image TEXT,
  explanation_image TEXT,
  section VARCHAR(255),
  type INT DEFAULT 0,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT questions_file_id_fkey FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE batch_bans (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  user_id CHAR(36) NOT NULL,
  batch_id CHAR(36) NOT NULL,
  banned_until DATETIME NOT NULL,
  reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT batch_bans_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(uid) ON DELETE CASCADE,
  CONSTRAINT batch_bans_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE exams (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  slug VARCHAR(255) NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  course_name VARCHAR(255),
  batch_id CHAR(36), -- Primary batch this exam belongs to
  duration_minutes INT DEFAULT 120,
  negative_marks_per_wrong DECIMAL(5, 2) DEFAULT 0.25,
  file_id CHAR(36),
  is_practice TINYINT(1) DEFAULT 0,
  number_of_attempts ENUM('one_time', 'multiple') DEFAULT 'one_time',
  status ENUM('draft', 'live', 'ended') DEFAULT 'draft',
  start_at DATETIME NULL DEFAULT NULL,
  end_at DATETIME NULL DEFAULT NULL,
  shuffle_sections_only TINYINT(1) DEFAULT 0,
  shuffle_questions TINYINT(1) DEFAULT 0,
  marks_per_question DECIMAL(5, 2) DEFAULT 1.00,
  total_subjects INT,
  mandatory_subjects JSON DEFAULT (JSON_ARRAY()),
  optional_subjects JSON DEFAULT (JSON_ARRAY()),
  created_by CHAR(36),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  practice_after_live TINYINT(1) DEFAULT 1,
  -- batch_ids JSON removed: Use the new batch_exams table below
  PRIMARY KEY (id),
  CONSTRAINT exams_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE SET NULL,
  CONSTRAINT exams_file_id_fkey FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE SET NULL,
  CONSTRAINT exams_created_by_fkey FOREIGN KEY (created_by) REFERENCES admins(uid) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE orders (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  student_id CHAR(36) NOT NULL,
  batch_id CHAR(36) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  payment_method VARCHAR(255) NOT NULL,
  payment_number VARCHAR(255) NOT NULL,
  trx_id VARCHAR(255) NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  admin_comment TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  assigned_token VARCHAR(255),
  expires_at DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT orders_student_id_fkey FOREIGN KEY (student_id) REFERENCES users(uid) ON DELETE CASCADE,
  CONSTRAINT orders_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE student_attendance (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  student_id CHAR(36) NOT NULL,
  batch_id CHAR(36) NOT NULL,
  attendance_date DATE DEFAULT (CURRENT_DATE),
  present TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT student_attendance_student_id_fkey FOREIGN KEY (student_id) REFERENCES users(uid) ON DELETE CASCADE,
  CONSTRAINT student_attendance_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE student_tasks (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  student_id CHAR(36) NOT NULL,
  batch_id CHAR(36) NOT NULL,
  task_date DATE DEFAULT (CURRENT_DATE),
  mandatory_done TINYINT(1) DEFAULT 0,
  optional_done TINYINT(1) DEFAULT 0,
  todo_done TINYINT(1) DEFAULT 0,
  mandatory_url TEXT,
  optional_url TEXT,
  todo_url TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  mandatory_submitted_at DATETIME NULL DEFAULT NULL,
  optional_submitted_at DATETIME NULL DEFAULT NULL,
  todo_submitted_at DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT student_tasks_student_id_fkey FOREIGN KEY (student_id) REFERENCES users(uid) ON DELETE CASCADE,
  CONSTRAINT student_tasks_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------
-- 4. Third-Level Dependency Tables
-- --------------------------------------------------------

CREATE TABLE exam_questions (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  exam_id CHAR(36) NOT NULL,
  question_id CHAR(36) NOT NULL,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT exam_questions_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
  CONSTRAINT exam_questions_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE student_exams (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  exam_id CHAR(36) NOT NULL,
  student_id CHAR(36) NOT NULL,
  score DECIMAL(10, 2) DEFAULT 0.00,
  correct_answers INT DEFAULT 0,
  wrong_answers INT DEFAULT 0,
  unattempted INT DEFAULT 0,
  started_at DATETIME NULL DEFAULT NULL,
  submitted_at DATETIME NULL DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  batch_id CHAR(36),
  PRIMARY KEY (id),
  CONSTRAINT student_exams_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
  CONSTRAINT student_exams_student_id_fkey FOREIGN KEY (student_id) REFERENCES users(uid) ON DELETE CASCADE,
  CONSTRAINT student_exams_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- NEW: Junction table to handle many-to-many relationship between batches and exams efficiently
CREATE TABLE batch_exams (
  batch_id CHAR(36) NOT NULL,
  exam_id CHAR(36) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (batch_id, exam_id),
  CONSTRAINT batch_exams_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE,
  CONSTRAINT batch_exams_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------
-- 5. Fourth-Level Dependency Tables
-- --------------------------------------------------------

-- Merged student_answers and student_responses into a single unified table
CREATE TABLE student_responses (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  student_exam_id CHAR(36) NOT NULL,
  question_id CHAR(36) NOT NULL,
  selected_option VARCHAR(255), -- Handles both numbers and text safely
  is_correct TINYINT(1) DEFAULT 0,
  marks_obtained DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT student_responses_student_exam_id_fkey FOREIGN KEY (student_exam_id) REFERENCES student_exams(id) ON DELETE CASCADE,
  CONSTRAINT student_responses_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Re-enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;