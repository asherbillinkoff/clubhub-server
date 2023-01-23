const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 10,
    user: "root",
    host: "localhost",
    password: "asherbillinkoff",
    database: "clubhub"
});

module.exports = pool;