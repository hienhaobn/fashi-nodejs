const express=require('express');
const router=express.Router();

const bodyparser=require('body-parser');
const urlendcodeParser=bodyparser.urlencoded({extended:false});

var OrderController = require('../controllers/order.controller');

router.get('/list-order', OrderController.getListOrder);

module.exports = router;