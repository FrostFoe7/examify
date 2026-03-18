SET FOREIGN_KEY_CHECKS = 0;

-- ========================================================
-- 1. USERS & ACCESS CONTROL
-- ========================================================

CREATE TABLE users (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  username VARCHAR(255) UNIQUE,
  name VARCHAR(255),
  roll_number VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  profile_picture_url TEXT,
  phone VARCHAR(255) UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE admins (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  username VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  password VARCHAR(255) NOT NULL,
  profile_picture_url TEXT,
  is_super_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE roles (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  name VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(255),
  icon_url TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE user_roles (
  user_id CHAR(36) NOT NULL,
  role_id CHAR(36) NOT NULL,
  order_index INT DEFAULT 0,
  icon_url TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, role_id),
  CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ========================================================
-- 2. TAXONOMY & META CONTENT
-- ========================================================

CREATE TABLE categories (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE subjects (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  name VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE blogs (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  slug VARCHAR(255) NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content LONGTEXT NOT NULL,
  excerpt TEXT,
  image_url TEXT,
  category_id CHAR(36),
  author_id CHAR(36),
  status ENUM('draft', 'published') DEFAULT 'published',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT blogs_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  CONSTRAINT blogs_author_id_fkey FOREIGN KEY (author_id) REFERENCES admins(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_category_id (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ========================================================
-- 3. BATCHES & COMMERCE
-- ========================================================

CREATE TABLE batches (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  slug VARCHAR(255) NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  image_url TEXT,
  order_index INT DEFAULT 0,
  is_public BOOLEAN DEFAULT FALSE,
  status ENUM('live', 'ended') DEFAULT 'live',
  created_by CHAR(36),
  tasks_enabled BOOLEAN DEFAULT FALSE,
  price DECIMAL(10, 2) DEFAULT 0.00,
  old_price DECIMAL(10, 2) DEFAULT 0.00,
  category_id CHAR(36),
  default_approval_message TEXT,
  live_exams_count INT DEFAULT 0,
  lecture_notes_count INT DEFAULT 0,
  standard_exams_count INT DEFAULT 0,
  solve_sheets_count INT DEFAULT 0,
  routine_url TEXT,
  offer_expires_at DATETIME NULL DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT batches_created_by_fkey FOREIGN KEY (created_by) REFERENCES admins(id) ON DELETE SET NULL,
  CONSTRAINT batches_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_is_public (is_public),
  INDEX idx_category_id (category_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE batch_tags (
  batch_id CHAR(36) NOT NULL,
  tag VARCHAR(100) NOT NULL,
  PRIMARY KEY (batch_id, tag),
  CONSTRAINT batch_tags_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE batch_features (
  batch_id CHAR(36) NOT NULL,
  feature VARCHAR(255) NOT NULL,
  PRIMARY KEY (batch_id, feature),
  CONSTRAINT batch_features_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE promo_codes (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  code VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  discount_type ENUM('percentage', 'fixed') DEFAULT 'fixed',
  discount_value DECIMAL(10, 2) NOT NULL,
  batch_id CHAR(36) NULL, -- If NULL, it applies to all batches
  max_uses INT NULL DEFAULT NULL, -- If NULL, infinite uses
  current_uses INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  expires_at DATETIME NULL DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT promo_codes_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE,
  INDEX idx_code (code),
  INDEX idx_is_active (is_active),
  INDEX idx_expires_at (expires_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE orders (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  student_id CHAR(36) NOT NULL,
  batch_id CHAR(36) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  discount_amount DECIMAL(10, 2) DEFAULT 0.00,
  currency VARCHAR(10) DEFAULT 'BDT',
  promo_code_id CHAR(36) NULL,
  payment_method VARCHAR(255) NOT NULL,
  payment_number VARCHAR(255) NOT NULL,
  transaction_id VARCHAR(255) NOT NULL,
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  admin_comment TEXT,
  verified_by CHAR(36),
  verified_at TIMESTAMP NULL DEFAULT NULL,
  expires_at DATETIME NULL DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY unique_student_batch (student_id, batch_id),
  CONSTRAINT orders_student_id_fkey FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT orders_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE,
  CONSTRAINT orders_promo_code_id_fkey FOREIGN KEY (promo_code_id) REFERENCES promo_codes(id) ON DELETE SET NULL,
  CONSTRAINT orders_verified_by_fkey FOREIGN KEY (verified_by) REFERENCES admins(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_promo_code_id (promo_code_id),
  INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE batch_bans (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  user_id CHAR(36) NOT NULL,
  batch_id CHAR(36) NOT NULL,
  banned_until DATETIME NOT NULL,
  reason TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT batch_bans_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT batch_bans_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE,
  INDEX idx_banned_until (banned_until)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ========================================================
-- 4. FILES & QUESTION BANK
-- ========================================================

CREATE TABLE files (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  original_filename VARCHAR(255) NOT NULL,
  display_name VARCHAR(255),
  category_id CHAR(36),
  batch_id CHAR(36),
  total_questions INT DEFAULT 0,
  external_id VARCHAR(255),
  is_bank BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT files_category_id_fkey FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
  CONSTRAINT files_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE SET NULL,
  INDEX idx_is_bank (is_bank)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE questions (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  file_id CHAR(36) NOT NULL,
  content TEXT,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  option_e TEXT,
  correct_option ENUM('A', 'B', 'C', 'D', 'E'),
  explanation TEXT,
  question_image_url TEXT,
  explanation_image_url TEXT,
  section VARCHAR(255),
  question_type INT DEFAULT 0,
  difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'medium',
  order_index INT DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT questions_file_id_fkey FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE CASCADE,
  INDEX idx_question_type (question_type),
  INDEX idx_section (section),
  INDEX idx_difficulty (difficulty)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ========================================================
-- 5. EXAMS & ASSESSMENTS
-- ========================================================

CREATE TABLE exams (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  slug VARCHAR(255) NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  course_name VARCHAR(255),
  batch_id CHAR(36) NOT NULL,
  file_id CHAR(36),
  duration_minutes INT DEFAULT 120,
  penalty_per_wrong_answer DECIMAL(5, 2) DEFAULT 0.25,
  points_per_question DECIMAL(5, 2) DEFAULT 1.00,
  is_practice BOOLEAN DEFAULT FALSE,
  allow_practice_after_live BOOLEAN DEFAULT TRUE,
  attempt_limit ENUM('one_time', 'multiple') DEFAULT 'one_time',
  status ENUM('draft', 'live', 'ended') DEFAULT 'draft',
  start_at DATETIME NULL DEFAULT NULL,
  end_at DATETIME NULL DEFAULT NULL,
  shuffle_sections_only BOOLEAN DEFAULT FALSE,
  shuffle_questions BOOLEAN DEFAULT FALSE,
  created_by CHAR(36),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id),
  CONSTRAINT exams_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE,
  CONSTRAINT exams_file_id_fkey FOREIGN KEY (file_id) REFERENCES files(id) ON DELETE SET NULL,
  CONSTRAINT exams_created_by_fkey FOREIGN KEY (created_by) REFERENCES admins(id) ON DELETE SET NULL,
  INDEX idx_status (status),
  INDEX idx_is_practice (is_practice)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE batch_exams (
  batch_id CHAR(36) NOT NULL,
  exam_id CHAR(36) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (batch_id, exam_id),
  CONSTRAINT batch_exams_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE,
  CONSTRAINT batch_exams_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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

CREATE TABLE exam_subjects (
  exam_id CHAR(36) NOT NULL,
  subject_id CHAR(36) NOT NULL,
  is_mandatory BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (exam_id, subject_id),
  CONSTRAINT exam_subjects_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
  CONSTRAINT exam_subjects_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ========================================================
-- 6. TASKS & LMS INTERACTIONS
-- ========================================================

CREATE TABLE tasks (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  batch_id CHAR(36) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  task_type ENUM('mandatory', 'optional', 'todo') DEFAULT 'mandatory',
  schedule_type ENUM('daily', 'weekly', 'monthly', 'custom') DEFAULT 'custom',
  start_at DATETIME NULL DEFAULT NULL,
  end_at DATETIME NULL DEFAULT NULL,
  order_index INT DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT tasks_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE,
  INDEX idx_task_type (task_type),
  INDEX idx_schedule_type (schedule_type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE student_task_submissions (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  student_id CHAR(36) NOT NULL,
  task_id CHAR(36) NOT NULL,
  submission_url TEXT,
  status ENUM('pending', 'submitted', 'approved', 'rejected') DEFAULT 'submitted',
  admin_comment TEXT,
  submitted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT student_task_submissions_student_id_fkey FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT student_task_submissions_task_id_fkey FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
  INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE student_attendance (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  student_id CHAR(36) NOT NULL,
  batch_id CHAR(36) NOT NULL,
  attendance_date DATE DEFAULT (CURRENT_DATE),
  is_present BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY unique_attendance (student_id, batch_id, attendance_date),
  CONSTRAINT student_attendance_student_id_fkey FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT student_attendance_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE,
  INDEX idx_attendance_date (attendance_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ========================================================
-- 7. STUDENT PERFORMANCE & ANALYTICS
-- ========================================================

CREATE TABLE student_exams (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  exam_id CHAR(36) NOT NULL,
  student_id CHAR(36) NOT NULL,
  batch_id CHAR(36),
  attempt_no INT DEFAULT 1,
  total_score DECIMAL(10, 2) DEFAULT 0.00,
  correct_count INT DEFAULT 0,
  incorrect_count INT DEFAULT 0,
  unattempted_count INT DEFAULT 0,
  started_at DATETIME NULL DEFAULT NULL,
  submitted_at DATETIME NULL DEFAULT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT student_exams_exam_id_fkey FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
  CONSTRAINT student_exams_student_id_fkey FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT student_exams_batch_id_fkey FOREIGN KEY (batch_id) REFERENCES batches(id) ON DELETE CASCADE,
  INDEX idx_exam_student (exam_id, student_id),
  INDEX idx_batch_student (batch_id, student_id),
  INDEX idx_submitted_at (submitted_at),
  INDEX idx_total_score (total_score)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE student_responses (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  student_exam_id CHAR(36) NOT NULL,
  question_id CHAR(36) NOT NULL,
  selected_option VARCHAR(255),
  is_correct BOOLEAN DEFAULT FALSE,
  marks_obtained DECIMAL(10, 2) DEFAULT 0.00,
  time_taken_seconds INT DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT student_responses_student_exam_id_fkey FOREIGN KEY (student_exam_id) REFERENCES student_exams(id) ON DELETE CASCADE,
  CONSTRAINT student_responses_question_id_fkey FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE daily_records (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  student_id CHAR(36) NOT NULL,
  exams_attempted INT DEFAULT 0,
  questions_solved INT DEFAULT 0,
  record_date DATE DEFAULT (CURRENT_DATE),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT daily_records_student_id_fkey FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_record_date (record_date)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE study_sessions (
  id CHAR(36) NOT NULL DEFAULT (UUID()),
  user_id CHAR(36) NOT NULL,
  subject_id CHAR(36) NOT NULL,
  start_time DATETIME NOT NULL,
  end_time DATETIME NOT NULL,
  total_seconds INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT study_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  CONSTRAINT study_sessions_subject_id_fkey FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE,
  INDEX idx_start_time (start_time)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;