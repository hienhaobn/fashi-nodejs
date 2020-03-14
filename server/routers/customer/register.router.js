const express=require('express');
const router=express.Router();

var User = require('../../controllers/customer/register.controller');


router.get('/', User.getRegisterForm);

router.post('/', User.postRegisterForm);

module.exports = router;