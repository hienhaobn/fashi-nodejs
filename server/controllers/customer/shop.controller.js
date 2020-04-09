const mongoose = require('mongoose');
const Product = require('../product.controller');
module.exports.getProductSale = (req, res) => {
  res.render("pages/shop");
};
module.exports.getProductMen = async (req, res) => {
  res.render("pages/shop-men");
};
module.exports.getProductWomen = (req, res) => {
  res.render("pages/shop-women");
};
module.exports.getProductKid = (req, res) => {
  res.render("pages/shop-kids");
};