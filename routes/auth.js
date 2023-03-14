var express = require("express");
var router = express.Router();
const db = require("../model/helper");

const bcrypt = require("bcryptjs"); // run npm install bcrypt in client and server DONE

const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");

const jwt = require("jsonwebtoken"); // run  npm install jwt in server DONE

/* POST new user added to DB*/
router.post("/register", async (req, res) => {
  let { name, password, email } = req.body;

  let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

  try {
    let sql = `
        INSERT INTO users (name, password, email)
        VALUES ('${name}', '${hashedPassword}', '${email}')
    `;
    console.log("testing if it insert:", sql);

    await db(sql);
    res.send({
      message: "Success! You created a new account.",
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

//POST- log in user

router.post("/login", async (req, res) => {
  let { emailLogin, passwordLogin } = req.body;

  try {
    let results = await db(`SELECT * FROM users WHERE email = '${emailLogin}'`);

    if (results.data.length === 0) {
      //email not found
      res.status(401).send({ error: "Email not found.Login failed" });
    } else {
      let user = results.data[0]; //the user's row/record from the db
      let passwordsEqual = await bcrypt.compare(passwordLogin, user.password);

      // console.log(
      //   "WHAT IS PASSWORD",
      //   password,
      //   " WHAT IS USER.PASSWORD",
      //   password
      // );
      // console.log(user);
      // console.log(await bcrypt.compare(password, password));

      if (passwordsEqual) {
        //passwords match
        let payload = { id: user.id };
        //create a token containing the ID
        let token = jwt.sign(payload, SECRET_KEY);
        //also return user (without password)
        delete user.password;
        res.send({
          message: "Login succeeded",
          token: token,
          user: user,
        });
      } else {
        //password doesn't match
        res
          .status(401)
          .send(
            "Failing because my boolean is telling me that the passwords are not matching: Login failed"
          );
      }
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
