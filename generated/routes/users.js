//Test
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const pool = require("../api/db-connection");

router.post("/register", (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const is_male = req.body.is_male;
  const address = req.body.address;
  const city = req.body.city;
  const country = req.body.country;
  console.log(req.body);

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    pool.query(
      "INSERT INTO users VALUES(null,?,?,?,?,?,?,?,?,null)",
      [firstName, lastName, email, hash, is_male, address, city, country],
      (err, result) => {
        if (result) {
          res.send(result).status(200);
        }
      }
    );
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  pool.query("SELECT * FROM users WHERE email = ?;", email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].encrypted_pass, (error, response) => {
        if (response) {
          req.session.userid = `${result[0].id}`;
          console.log(req.session);
          res
            .send({ message: "Success", loggedIn: req.session.userid })
            .status(200);
        } else {
          res
            .send({ message: "Wrong account information", loggedIn: 0 })
            .status(200);
        }
      });
    } else {
      res.send({ message: "User does not exist" });
    }
  });
});

router.get("/login", (req, res) => {
  console.log(req.session);
  if (req.session.userid) {
    console.log(req.session);
    res.send({ loggedIn: req.session.userid }).status(200);
  } else {
    res.send({ loggedIn: 0 }).status(200);
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("userId").send();
  req.session.destroy();
});

module.exports = router;
