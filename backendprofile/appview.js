const path=require('path')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const contactussRoutes = require('./routes/contactus'); 


app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(contactussRoutes); 
app.use('/success', (req, res) => {
    console.log('Success route accessed');
    res.sendFile(path.join(__dirname,'views','success.html'));
});

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname,'views','error.html'));
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
