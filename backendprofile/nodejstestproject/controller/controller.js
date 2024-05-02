const connection=require('../model/database');
const fs = require("fs");


exports.showTable= (req, res) => {
    const getTablesQuery = "SHOW TABLES";
    connection.query(getTablesQuery, (err, result) => {
        if (err) {
            console.error("Error fetching table names:", err);
            res.status(500).send("Error fetching table names");
            return;
        }
        const tableNames = result.map(row => row[`Tables_in_${connection.config.database}`]);

        fs.readFile("./public/home.html", "utf8", (err, data) => {
            if (err) {
                console.error("Error reading homepage.html:", err);
                res.status(500).send("Error reading homepage.html");
                return;

            }

            const tableLinks = tableNames.map(tableName => `<li>${tableName}</li>`).join("");
            const html = data.replace("<!-- Table names will be appended here dynamically -->", tableLinks);
            
            res.send(html);
        });
    });
};

exports.createTable=((req, res) => {
    const { tableName, fields } = req.body;
    const createTableQuery = `CREATE TABLE ${tableName} (${fields})`;
    
    connection.query(createTableQuery, (err, result) => {
        if (err) {
            console.error("Error creating table:", err);
            res.status(500).send("Error creating table");
            return;
        }
        console.log("Table created successfully");
        res.redirect("/");
    });
});

