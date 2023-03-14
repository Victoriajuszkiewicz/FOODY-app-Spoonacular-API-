
--
-- Here are some sample SQL statements for implementing CRUD functionality.
-- CRUD: C)reate, R)ead, U)pdate and D)elete
--
-- Last update: 17 May 2022
--



--
-- Databases
--

-- Show all DBs
SHOW DATABASES;
-- Delete DB 'school'
DROP DATABASE IF EXISTS school;
-- Create DB 'school'
CREATE DATABASE school;
-- Make 'school' the current DB
USE school;


--
-- Tables
--

-- List all tables in the current DB
SHOW TABLES;
-- Show columns and data types of table 'classes'
DESCRIBE classes;


--
-- Drop tables if they exist
--

SET foreign_key_checks = 0;  -- Turn off FK (foreign key) checks
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS students;
SET foreign_key_checks = 1;  -- Turn on FK checks again

--
-- (Re)create tables
--

CREATE TABLE classes (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100),
    teacher VARCHAR(100)
);

CREATE TABLE students (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    class_id INT NOT NULL,
    FOREIGN KEY (class_id) REFERENCES classes(id)
);


--
-- Add some data into each table
--

INSERT INTO classes (title, teacher) 
VALUES
    ('React', 'Fernandez'),  -- ID = 1
    ('Express', 'Johnson');  -- ID = 2

INSERT INTO students (first_name, last_name, class_id) 
VALUES 
    ('Sue', 'Andrews', 1),
    ('Luis', 'Alvarez', 1),
    ('Sam', 'Huston', 2),
    ('Maria', 'Sorgaard', 2),
    ('Ahmed', 'Omar', 1),
    ('Angelica', 'Busconi', 2);

-- We can also insert individual records
INSERT INTO students (first_name, last_name, class_id) 
VALUES ('Al', 'Green', 2);


--
-- Query the data
--

-- Get all fields for all students
SELECT * FROM students;

-- Only show last/first name, sorted by last name
SELECT last_name, first_name FROM students ORDER BY last_name;

-- Get all students with last name 'Huston'
SELECT * FROM students WHERE last_name = 'Huston';

-- Print student names and classes they are in (verbose)
SELECT students.first_name, students.last_name, classes.title
FROM students
LEFT JOIN classes ON students.class_id = classes.id;

-- Do the same query, but a bit less verbose
SELECT s.first_name, s.last_name, c.title
FROM students AS s
LEFT JOIN classes AS c ON s.class_id = c.id;


--
-- Modify records
--

-- Luis prefers to be called Lou
UPDATE students SET first_name = 'Lou' WHERE id = 2;

-- Ahmed switched from React to Express class
UPDATE students SET class_id = 2 WHERE id = 5;

-- Sue got married. Update her last name
UPDATE students SET last_name = 'Andrews-Jones' WHERE id = 1;
-- We don't always have to filter on ID (although it's safer)
UPDATE students SET last_name = 'Andrews-Jones'
    WHERE first_name = 'Sue' AND last_name = 'Andrews';


--
-- Delete records
--

-- Remove Sam from class
DELETE FROM students WHERE id = 3;