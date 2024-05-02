const express = require("express");
const bodyParser = require("body-parser");
const cors=require('cors');
const router=require('./router/router');
const path=require('path');

const app = express();
const port = 5110;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public')); 
app.use('/', router);
app.use('/create_table', (req, res) => {
    res.sendFile(path.join(__dirname,'public','create_table.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
