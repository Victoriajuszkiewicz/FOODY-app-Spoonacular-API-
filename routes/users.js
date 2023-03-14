var express = require("express");
var router = express.Router();
const db = require("../model/helper");

//Get all
router.get("/register", async function (req, res, next) {
  let sql = "SELECT * FROM users  ORDER BY name";
  //ORDER BY name will order alpabetically

  try {
    let results = await db(sql);
    let users = results.data;
    users.forEach((u) => delete u.password); //don't return the password
    res.send(users);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
