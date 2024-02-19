const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host:
    process.env.MYSQL_ADDON_HOST ||
    "boywhqubwekwc6rafepy-mysql.services.clever-cloud.com",
  user: process.env.MYSQL_ADDON_USER || "uqeg3jldr2xyhgqx",
  database: process.env.MYSQL_ADDON_DB || "boywhqubwekwc6rafepy",
  password: process.env.MYSQL_ADDON_PASSWORD || "4Nc0fURNpLzfidNJSwFA",
  port: process.env.MYSQL_ADDON_PORT || 3306,

  // uri: process.env.MYSQL_ADDON_URI || "",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = connection;
