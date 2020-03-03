const express=require('express');
const router=express.Router();

const bodyparser=require('body-parser');
const urlendcodeParser=bodyparser.urlencoded({extended:false});

var ProductMenController = require('../controllers/productKid.controller');


router.get('/', ProductMenController.getProductKid);

router.get('/:id', ProductMenController.getProduct);
router.post('/edit-product-kid/:id', urlendcodeParser, ProductMenController.editProductKid);
router.post('/delete-product-kid/:id', urlendcodeParser, ProductMenController.deleteProductKid);

router.post('/create-product-kid',urlendcodeParser, ProductMenController.createProductKid);



module.exports = router;