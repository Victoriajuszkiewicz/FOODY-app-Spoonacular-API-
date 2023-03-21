var express = require("express");
const { ensureSameUser, ensureUserLoggedIn } = require("../middleware/guards");
var router = express.Router();
const db = require("../model/helper"); //here on line 3  we imported the helper.js file that helps us connect to the database

// the backend here is what you want to do with the info in your database:

/* GET all favorites listing. */
// I need to turn this into get all favorites per USERID
//I remove the next because it should already be in ensureSameUser
router.get("/favorites/:id", ensureSameUser, async function (req, res) {
  //because we want to get fav by id, this req params is important to add
  let { id } = req.params;
  let sql = `SELECT * FROM favorites WHERE user_id = ${id}`;

  try {
    //if the database is not empty
    //then take in the database all those following info: recipeid, title image,
    // only the one that has the recipe id and user id equal to the userid in the local storage

    //otherwise, just show a message to say the favorite page is empty or something like this
    let results = await db(sql);
    let favorites = results.data;
    res.send(favorites);
  } catch (err) {
    res.status(500).send({ error: err.message });
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
      res.status(200).send(result.data);
    } else {
      // console.log("this is the second console");
      // or else delete it
      let sql = `
      DELETE FROM FAVORITES WHERE recipe_id === "${recipe_id}" and user_id="${user_id}"`;
      let response = await db(sql);
      res.send(response.data);
    }
  } catch (err) {
    res.status(500).send(`${err.message}`);
  }
});

module.exports = router;
