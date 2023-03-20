SET foreign_key_checks = 0;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS favorites;
DROP TABLE IF EXISTS user_favorites;
SET foreign_key_checks = 1;


CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    name VARCHAR(30) NOT NULL,
    email VARCHAR(200) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL
);

-- remember to create favorites after users, or this will show an error message cause user_id won't be create yet
 
CREATE TABLE favorites (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT NOT NULL,
    recipe_name VARCHAR(100) NOT NULL,
    recipe_image VARCHAR(100) NOT NULL,
    recipe_link VARCHAR(100) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE user_favorites (
userId INT NOT NULL,
favoritesId INT NOT NULL,
PRIMARY KEY (userId, favoritesId),
FOREIGN KEY (userId) REFERENCES users(id),
FOREIGN KEY (favoritesId) REFERENCES favorites(id)
);

-- INSERT INTO users
-- VALUES 
-- (1,'Jim','jim.nugget@nuggetlove.com','$2b$12$eFzMWbS9SogNtxkmo3J7a08FQMIOVsF6GGKpTQdgq.W'), 
-- (2,'Maya','maya.nugget@nuggetlove.com','$2b$12$eFzMWbS9SogNtxkmo3J7a08FQMIOVsF6GGKpTQdgq.E'), 
-- (3,'Dodo','dodo.nugget@nuggetlove.com','$2b$12$eFzMWbS9SogNtxkmo3J7a08FQMIOVsF6GGKpTQdgq.R');

