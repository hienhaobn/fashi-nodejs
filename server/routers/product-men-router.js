const express=require('express');
const router=express.Router();

const bodyparser=require('body-parser');
const urlendcodeParser=bodyparser.urlencoded({extended:false});

var ProductMenController = require('../controllers/productMen.controller');


router.get('/', ProductMenController.getProductMen);

router.get('/edit-product-men/:id', urlendcodeParser, ProductMenController.getEditProductMen);

router.post('/delete-prduct-men&:id', ProductMenController.deleteProductMen);

router.post('/create-product-men',urlendcodeParser, ProductMenController.createProductMen);



module.exports = router;