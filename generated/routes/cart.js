// Includes all routes related to fetching and updating cart information
const express = require("express");
const router = express.Router();
const pool = require("../api/db-connection");

router.get("/cartitems/:userid", (req, res) => {
  let userId = req.params.userid;
  console.log("Entered cart items get");
  console.log(req.params.userid);
  pool.query(
    "SELECT * FROM clubhub.shopping_cart AS c JOIN clubhub.products as p ON c.product_id = p.id WHERE user_id = ?;",
    [userId],
    (err, result) => {
      if (err) {
        console.log(err);
        console.log(userId);
        // res.send({ message: err });
      } else if (result) {
        console.log("Cart Items Requested:");
        console.log(result);
        res.send(result);
      }
    }
  );
});

router.post("/addtocart", (req, res) => {
  const userId = req.body.userId;
  const productId = req.body.productId;
  console.log("Entered /addtocart route");

  pool.query(
    "INSERT INTO shopping_cart VALUES(null, ?, ?, 1)",
    [userId, productId],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      } else {
        res.send({ message: "Added to cart" });
      }
    }
  );
});

router.post("/removeitem/:itemid", (req, res) => {
  const itemId = req.params.itemid;
  console.log("Entered /removeFromCart route");

  pool.query(
    "UPDATE shopping_cart SET qty = qty - 1 WHERE item_id = ?;",
    [itemId],
    (err, result) => {
      if (err) {
        res.send({ err: err }).status(400);
      } else {
        res.send({ message: "Removed from cart" }).status(200);
      }
    }
  );
});

router.post("/removeproduct/:itemid", (req, res) => {
  const itemId1 = req.params.itemid;
  console.log("Entered /removeproduct route.", itemId1);

  pool.query(
    "DELETE FROM shopping_cart WHERE item_id = ?;",
    [itemId1],
    (err, result) => {
      if (err) {
        res.send({ err: err }).status(400);
        console.log("Failed to remove product");
      } else if (result) {
        res
          .send({
            message: "Removed product from cart",
          })
          .status(200);
        console.log(result);
      }
    }
  );
});

router.post("/updatecart/:itemid", (req, res) => {
  const itemId = req.params.itemid;
  console.log("Entered /updatecart route");

  pool.query(
    "UPDATE shopping_cart SET qty = qty + 1 WHERE item_id = ?;",
    [itemId],
    (err, result) => {
      if (err) {
        res.send({ err: err }).status(400);
      } else {
        res
          .send({
            message: "Added additional item to cart",
          })
          .status(200);
        console.log(result);
      }
    }
  );
});

module.exports = router;
