const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Password@123",
    database: "test-project"
});
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database");
});

module.exports=connection;