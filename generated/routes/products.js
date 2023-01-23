// Includes routes related to fetching product information
const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const pool = require("../api/db-connection");

router.get("/products", (req, res) => {
  let maxPrice = `price < ${req.query.maxprice}`;
  let clubType = `club_type LIKE '%${req.query.club_type}%'`;
  let brand = `brand LIKE '%${req.query.brand}%'`;
  let hand = `is_left LIKE '%${req.query.hand}%'`;
  let filterQuery =
    "SELECT * FROM products WHERE " +
    maxPrice +
    " AND " +
    clubType +
    " AND " +
    brand +
    " AND " +
    hand;
  console.log(filterQuery);
  pool.query(filterQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ err: err }).status(400);
    } else if (result.length > 0) {
      res.send(result).status(200);
      console.log(result);
    }
  });
});

router.get("/products/:filter", (req, res) => {
  let clubFilter = req.params.filter;
  let productsQuery;
  if (clubFilter.toString() === "all") {
    productsQuery = "SELECT * FROM products";
  } else {
    productsQuery = `SELECT * FROM products WHERE club_type LIKE '%${clubFilter}%';`;
  }
  pool.query(productsQuery, (err, result) => {
    if (err) {
      console.log(err);
      res.send({ err: err }).status(400);
    } else if (result.length > 0) {
      res.send(result).status(200);
      console.log(result);
    } else if (result.length === 0) {
      res.send({ message: "No results." }).status(200);
    }
  });
});

router.get("/productdetails/:id", (req, res) => {
  let productId = req.params.id;
  pool.query(
    "SELECT * FROM products WHERE ID = ?",
    [productId],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log("Requested product details:");
      console.log(result);
      res.send(result);
    }
  );
});

module.exports = router;
