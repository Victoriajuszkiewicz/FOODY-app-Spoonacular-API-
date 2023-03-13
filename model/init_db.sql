--
-- Drop Tables
--

SET foreign_key_checks = 0;
DROP TABLE IF EXISTS favorites;
SET foreign_key_checks = 1;

--
-- Create Tables
--

CREATE TABLE favorites (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    recipe_id VARCHAR(40) NOT NULL,
    recipe_name VARCHAR(100) NOT NULL,
    recipe_image VARCHAR(200) NOT NULL,
    recipe_link VARCHAR(200) NOT NULL
);



