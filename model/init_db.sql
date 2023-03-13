--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS publishers;
DROP TABLE IF EXISTS books_authors;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE authors (
    id INT NOT NULL AUTO_INCREMENT, 
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE publishers (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(200) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE books (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    pages INT NOT NULL,
    publisherId INT,
    PRIMARY KEY (id),
    FOREIGN KEY (publisherId) REFERENCES publishers(id) ON DELETE SET NULL
);

CREATE TABLE books_authors (
    bookId INT NOT NULL,
    authorId INT NOT NULL,
    PRIMARY KEY (bookId, authorId),
    FOREIGN KEY (bookId) REFERENCES books(id) ON DELETE CASCADE,
    FOREIGN KEY (authorId) REFERENCES authors(id) ON DELETE CASCADE
);

--
-- Insert Sample Data
--

INSERT INTO authors (firstName, lastName)
VALUES
    ('Maria', 'Hernandez'),
    ('Fritz', 'Zimmermann'),
    ('Hanna', "Sondergaard");

INSERT INTO publishers (name, address)
VALUES
    ('Macmillan', '1 Publisher Square, Boston'),
    ("O'Reilly", '300 Madison Avenue, New York'),
    ('Random House', "10 Queen's Road, London");

INSERT INTO books (title, pages, publisherId)
VALUES
    ('All About JavaScript', 450, 2),
    ('The Zen of Cats', 325, 1),
    ('Once Upon a Time', 700, 3),
    ('Twice Upon a Time', 600, 3);

INSERT INTO books_authors (bookId, authorId)
VALUES
    (1, 1),
    (1, 2),
    (2, 1),
    (2, 3),
    (3, 3),
    (4, 3);