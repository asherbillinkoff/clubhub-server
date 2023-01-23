const express = require("express");
const router = express.Router();
const pool = require("../api/db-connection");

router.get("/userprofile", (req, res) => {
  console.log(req.session.userid);
  pool.query(
    "SELECT * FROM users WHERE id = ?;",
    [req.session.userid],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else if (result) {
        res.send(result);
        console.log(result);
      }
    }
  );
});

router.post("/editprofile", (req, res) => {
  const userId = req.body.userId;
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const address = req.body.address;

  pool.query(
    "UPDATE users SET email = ?, first_name = ?, last_name = ?, address = ? WHERE user_id = ?;",
    [email, firstName, lastName, address, userId],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else if (result) {
        res.send(result);
      }
    }
  );
});

module.exports = router;
