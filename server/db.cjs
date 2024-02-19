const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "boywhqubwekwc6rafepy-mysql.services.clever-cloud.com",
  user: "uqeg3jldr2xyhgqx",
  database: "boywhqubwekwc6rafepy",
  password: "4Nc0fURNpLzfidNJSwFA",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = connection;
