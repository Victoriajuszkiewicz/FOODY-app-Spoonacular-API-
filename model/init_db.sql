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
    recipe_title VARCHAR(100) NOT NULL,
    recipe_image_url VARCHAR(200) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- this part is not necessary because we don't have enough table that neded to be connected through a join table
-- CREATE TABLE user_favorites (
-- userId INT NOT NULL,
-- favoritesId INT NOT NULL,
-- PRIMARY KEY (userId, favoritesId),
-- FOREIGN KEY (userId) REFERENCES users(id),
-- FOREIGN KEY (favoritesId) REFERENCES favorites(id)
-- );
INSERT INTO users
VALUES 
(1,"jim","jim@nuggetlove.com","$2a$12$BDxZviP5nIvS6stEGg.ftuhoneUwIG9Je8ws03Q5NSsm745HNMVI2"), 
(2,"dodo","dodo@nugget.com","$2a$12$rgqr1bN5.CkvI/fVQBSrnu2sGFcL36f3Xjj2cC.Ev569bJ5DXOyMi"), 
(3,"winnie","winnie@nugget.com","$2a$12$7js6Wj4qp4gLmYj4h9BZXerRAVn3cdn04R0idFSujI93W6a0UCa4y"),
(4, "minion", "minion@nugget.com", "$2a$12$XMEKN7hM19N0dJYlPUn9cultdV2iYmKcHjm4FQM0wF1qj1jddRXqu");


INSERT INTO favorites
VALUES 
(1, 654679,"Parmesan Mashed Potatoes", "https://spoonacular.com/recipeImages/654679-312x231.jpg", 3),
(2, 661447,"Square Deviled Eggs", "https://spoonacular.com/recipeImages/661447-312x231.jpg", 1),
(3, 661447,"Square Deviled Eggs", "https://spoonacular.com/recipeImages/661447-312x231.jpg", 2),
(4, 636874,"Candy Cane Chocolate Marshmallows", "ttps://spoonacular.com/recipeImages/636874-312x231.jpg", 2),
(5, 636874,"Candy Cane Chocolate Marshmallows", "ttps://spoonacular.com/recipeImages/636874-312x231.jpg", 3),
(6, 652460,"Moscow Mule", "https://spoonacular.com/recipeImages/652460-312x231.jpg", 1);

-- INSERT INTO users
-- VALUES 
-- (1,'Jim','jim.nugget@nuggetlove.com','$2b$12$eFzMWbS9SogNtxkmo3J7a08FQMIOVsF6GGKpTQdgq.W'), 
-- (2,'Maya','maya.nugget@nuggetlove.com','$2b$12$eFzMWbS9SogNtxkmo3J7a08FQMIOVsF6GGKpTQdgq.E'), 
-- (3,'Dodo','dodo.nugget@nuggetlove.com','$2b$12$eFzMWbS9SogNtxkmo3J7a08FQMIOVsF6GGKpTQdgq.R');


-- INSERT INTO favorites
-- VALUES 
-- (654679,"Parmesan Mashed Potatoes", "https://spoonacular.com/recipeImages/654679-312x231.jpg", 3),
-- (661447,"Square Deviled Eggs", "https://spoonacular.com/recipeImages/661447-312x231.jpg", 1),
-- (661447,"Square Deviled Eggs", "https://spoonacular.com/recipeImages/661447-312x231.jpg", 2),
-- (636874,"Candy Cane Chocolate Marshmallows", "ttps://spoonacular.com/recipeImages/636874-312x231.jpg", 2),
-- (636874,"Candy Cane Chocolate Marshmallows", "ttps://spoonacular.com/recipeImages/636874-312x231.jpg", 3),
-- (652460,"Moscow Mule", "https://spoonacular.com/recipeImages/652460-312x231.jpg", 1);
