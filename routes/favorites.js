var express = require("express");
var router = express.Router();
const db = require("../model/helper"); //here on line 3  we imported the helper.js file that helps us connect to the database

// the backend here is what you want to do with the info in your database:

/* GET all favorites listing. */
// I need to turn this into get all favorites per USERID
router.get("/favorites/userId", async function (req, res, next) {
  let sql = `SELECT * FROM favorites ORDER BY id ASC`;

  try {
    let results = await db(sql);
    let favorites = results.data;
    res.send(favorites);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//i put the delete and post together for the love button so that if i already have that track in favorites
//dont add it again, instead delete it

router.post("/favorites", async (req, res, next) => {
  let { recipe_id, title, image, user_id } = req.body;
  try {
    let sql = `SELECT * FROM favorites WHERE recipe_id="${recipe_id}" and user_id="${user_id}"`;
    let result = await db(sql);

    if (result.data.length === 0) {
      //if that recipe with that id doesn't exist and i ended up with an empty array piece in my favorites then insert it
      let sql = `
      INSERT INTO FAVORITES (recipe_id, recipe_title, recipe_image_url, user_id) 
      VALUES ("${recipe_id}", "${title}", "${image}", "${user_id}")`;
      await db(sql);
    } else {
      // or else delete it
      let sql = `
      DELETE FROM FAVORITES WHERE recipe_id === "${recipe_id}" and user_id="${user_id}"`;
    }
  } catch (err) {
    res.status(500).send(`${err.message}`);
  }
});

module.exports = router;
