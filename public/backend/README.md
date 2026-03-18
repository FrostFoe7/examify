# Examify Reborn Backend API

This is a structured PHP backend for Examify Reborn.

## Structure
- `/Config`: Database connection and configuration.
- `/Controllers`: Business logic and request handling.
- `/core`: Autoloading and core bootstrap.
- `/api`: Entry point for API requests.

## Setup
1. Point your local PHP server (e.g., Apache/Nginx) to this directory.
2. Ensure you have MariaDB/MySQL running.
3. Import the `schema.sql` into your database.
4. Update `Config/Database.php` with your database credentials.

## API Endpoints
- `GET /api/stats`: Fetch landing page statistics.
- `GET /api/batches`: Fetch live batches/courses.
- `GET /api/public-exams`: Fetch public exams.
