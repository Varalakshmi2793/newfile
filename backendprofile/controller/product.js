const Product = require('../models/product'); 

const path = require('path');
const rootDir = require('../pathdir/path');

exports.productcontroller = (req, res) => {
    res.sendFile(path.join(rootDir, '..', 'views', 'add-product.html'));
};

exports.productgetcontroller = (req, res) => {
    const newProduct = new Product(req.body.title); 
    newProduct.save();
    res.redirect('/');
}
exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop', {
          prods: products,
          pageTitle: 'Shop',
          path: '/',
          hasProducts: products.length > 0
        });
      });
    };
