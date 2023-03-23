var express = require("express");
const { ensureSameUser, ensureUserLoggedIn } = require("../middleware/guards");
var router = express.Router();
const db = require("../model/helper"); //here on line 3  we imported the helper.js file that helps us connect to the database

// the backend here is what you want to do with the info in your database:

/* GET favorites recipes by userID */
// I need to turn this into get all favorites per USERID
//I remove the next because it should already be defined in ensureSameUser
router.get("/favorites/:id", ensureSameUser, async function (req, res) {
  try {
    //because we want to get fav by id, this req params is important to add
    let { id } = req.params;
    let sql = `SELECT * FROM favorites WHERE user_id = ${id}`;
    let results = await db(sql);
    let favorites = results.data;

    if (favorites.length === 0) {
      //if the database is empty
      res.send("You haven't added any favorite recipe yet");
    } else {
      res.status(200).send(favorites);
    }
  } catch (err) {
    res.status(500).send(`${err.message}`);
  }
});

//i put the delete and post together for the love button so that if i already have that track in favorites
//dont add it again, instead delete it
router.post("/favorites", ensureUserLoggedIn, async (req, res) => {
  //you don't need to user_id in this body, because it will be generating from fetching from the user database thanks to .... REFERENCE in my init_db
  let { recipe_id, recipe_title, recipe_image_url, user_id } = req.body;
  try {
    let sql = `SELECT * FROM favorites WHERE recipe_id="${recipe_id}" and user_id="${user_id}"`;
    let result = await db(sql);
    console.log(result);

    if (result.data.length === 0) {
      console.log("can you see this?");
      //if that recipe with that id doesn't exist and i ended up with an empty array piece in my favorites then insert it
      let sql = `
      INSERT INTO FAVORITES (recipe_id, recipe_title, recipe_image_url, user_id) 
      VALUES ("${recipe_id}", "${recipe_title}", "${recipe_image_url}", "${user_id}")`;
      let result = await db(sql);
      //return updated list of favourites
      sql = `SELECT * FROM favorites WHERE user_id="${user_id}"`;
      result = await db(sql);
      //it never returned updated list of fav so button fav didnt get that info and coulnt change colour!!!!
      res.status(200).send(result.data);
    } else {
      // or else delete it
      let sql = `
      DELETE FROM FAVORITES WHERE recipe_id = "${recipe_id}" and user_id="${user_id}"`;
      let response = await db(sql);
      //return updated list of favourites
      sql = `SELECT * FROM favorites WHERE user_id="${user_id}"`;
      result = await db(sql);
      res.send(response.data);
    }
  } catch (err) {
    res.status(500).send(`${err.message}`);
  }
});

module.exports = router;
