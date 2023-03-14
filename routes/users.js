var express = require("express");
var router = express.Router();
const db = require("../model/helper");
const { ensureSameUser } = require("../middleware/guards");

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

//GET USER BY ID
router.get("/:id", ensureSameUser, async function (req, res, next) {
  let { id } = req.params;
  let sql = "SELECT * FROM USERS where id = " + id;

  try {
    let results = await db(sql);
    // we know the user exists because they are logged in!
    let user = results.data[0];
    delete user.password; //we don't want to return the password
    res.send(user);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
