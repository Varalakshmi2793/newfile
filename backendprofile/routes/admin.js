const path = require('path');
const express = require('express');
const router = express.Router();
const prodcontroller=require('../controller/product');

router.get('/add-product', prodcontroller.productcontroller);

router.post('/add-product', prodcontroller.productgetcontroller);

module.exports = router;
