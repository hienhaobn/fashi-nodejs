const express=require('express');
const router=express.Router();

const bodyparser=require('body-parser');
const urlendcodeParser=bodyparser.urlencoded({extended:false});

var User = require('../../models/User');


router.get('/', User.getLogin);

router.get('/:id', User.RedirectLogin);