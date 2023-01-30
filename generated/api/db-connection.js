const mysql = require("mysql2");
require("dotenv").config();
console.log(process.env);

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;
