SET foreign_key_checks = 0;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS users;
SET foreign_key_checks = 1;
 
CREATE TABLE favorites (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT NOT NULL,
    recipe_name VARCHAR(100) NOT NULL,
    recipe_image VARCHAR(100) NOT NULL,
    recipe_link VARCHAR(100) NOT NULL
);

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(30) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL
);

--just starting data to test--
INSERT INTO users
VALUES 
(1,'Jim','jim.nugget@nuggetlove.com','$2b$12$eFzMWbS9SogNtxkmo3J7a08FQMIOVsF6GGKpTQdgq.W'), 
(2,'Maya','maya.nugget@nuggetlove.com','$2b$12$eFzMWbS9SogNtxkmo3J7a08FQMIOVsF6GGKpTQdgq.E'), 
(3,'Dodo','dodo.nugget@nuggetlove.com','$2b$12$eFzMWbS9SogNtxkmo3J7a08FQMIOVsF6GGKpTQdgq.R');

