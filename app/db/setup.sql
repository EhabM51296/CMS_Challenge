-- This file contains the SQL schema, it drops all tables and recreates them

DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS timesheets;

-- To add a field to a table do
-- CREATE TABLE table_name (
--     id INTEGER PRIMARY KEY AUTOINCREMENT,
--     nullable_field TEXT,
--     non_nullable_field TEXT NOT NULL,
--     numeric_field INTEGER,
--     unique_field TEXT UNIQUE,
--     unique_non_nullable_field TEXT NOT NULL UNIQUE,
--     date_field DATE,
--     datetime_field DATETIME
-- );


-- employee:
-- id, name, email, phone, dob, photo, cv, ID stored in app system
-- job title, department, salary, start date, end date

-- timesheet:
-- start time, end time, list of employees

-- Create employees table
CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    dob DATE  NOT NULL,
    phone TEXT NULL,
    photo TEXT NULL,
    cv TEXT NULL,
    card_ID TEXT NULL,
    job_title TEXT NULL,
    department TEXT NULL,
    salary REAL NULL,
    start_date DATE NULL,
    end_date DATE NULL
);

-- Create timesheets table
CREATE TABLE timesheets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    description Text NOT NULL,
    employee_id INTEGER,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    CHECK (end_time > start_time) 
);
