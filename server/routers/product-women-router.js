const express=require('express');
const router=express.Router();

const bodyparser=require('body-parser');
const urlendcodeParser=bodyparser.urlencoded({extended:false});

var ProductMenController = require('../controllers/productWomen.controller');


router.get('/', ProductMenController.getProductWomen);

router.get('/:id', urlendcodeParser, ProductMenController.getProduct);
router.post('/edit-product-women/:id', urlendcodeParser, ProductMenController.editProductWomen);
router.post('/delete-product-women/:id', urlendcodeParser, ProductMenController.deleteProductWomen);

router.post('/create-product-women',urlendcodeParser, ProductMenController.createProductWomen);



module.exports = router;