var express = require("express");
var router = express.Router();
const db = require("../model/helper"); //here on line 3  we imported the helper.js file that helps us connect to the database

// the backend here is what you want to do with the info in your database:

/* GET all favorites listing. */
router.get("/favorites", async function (req, res, next) {
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

// router.post();

module.exports = router;
