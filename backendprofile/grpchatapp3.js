    const express = require('express');
    const bodyParser = require("body-parser");
    const fs = require("fs");
    const app = express();

    app.use(bodyParser.urlencoded({ extended: true }));
    app.get('/login', (req, res) => {
        res.send('<form action="/" method="post"><label>Username:</label><input type="text" name="username"><button type="submit">Login</button></form>');
    });
    

    app.get('/', (req, res) => {
        fs.readFile('File.txt', (err, data) => {
            if (err) {
                data = "No Chat exists";
            }
            res.send(`${data}<form action="/" method="post" onSubmit="document.getElementById('username').value=localStorage.getItem('username');">
                <input type="text" name="message" id="message">
                <input type="hidden" name="username" id="username">
                <button type="submit">Send</button>
            </form>`);
        });
    });

    app.post('/', (req, res) => {
        console.log(req.body.username);
        console.log(req.body.message);
        fs.appendFile('File.txt', `${req.body.username}:${req.body.message}\n`, (err) => {
            if (err) {
                console.log(err);
            }
        });
        res.redirect('/');
    });

    app.listen(2000);
