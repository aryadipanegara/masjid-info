const mysql = require("mysql2");
require("dotenv").config(); // Menggunakan dotenv untuk mengambil variabel lingkungan

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  database: process.env.DB_DATABASE || "masjid_info",
  password: process.env.DB_PASSWORD || "", // Menggunakan nilai default kosong
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = connection;
