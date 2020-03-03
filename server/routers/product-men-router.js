const express=require('express');
const router=express.Router();

const bodyparser=require('body-parser');
const urlendcodeParser=bodyparser.urlencoded({extended:false});

var ProductMenController = require('../controllers/productMen.controller');


router.get('/', ProductMenController.getProductMen);

router.get('/:id', urlendcodeParser, ProductMenController.getProduct);
router.post('/edit-product-men/:id', urlendcodeParser, ProductMenController.editProductMen);
router.post('/delete-product-men/:id', urlendcodeParser, ProductMenController.deleteProductMen);

router.post('/create-product-men',urlendcodeParser, ProductMenController.createProductMen);



module.exports = router;