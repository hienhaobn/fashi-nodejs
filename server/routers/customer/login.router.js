const express=require('express');
const router=express.Router();

const bodyparser=require('body-parser');
const urlendcodeParser=bodyparser.urlencoded({extended:false});

var User = require('../../controllers/customer/login.controller');


router.get('/', User.getLogin);

router.post('/', User.RedirectLogin);

module.exports = router;