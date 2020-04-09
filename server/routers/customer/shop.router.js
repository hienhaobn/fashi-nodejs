const express=require('express');
const router=express.Router();

const ProductController = require('../../controllers/product.controller');

// router.get('/shop', ProductController.getProductSale);
router.get('/shop-men', ProductController.getListProductMen);
// router.get('/shop-women', ProductController.getProductWomen);
// router.get('/shop-kids', ProductController.getProductKid);
module.exports = router;