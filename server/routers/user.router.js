const express=require('express');
const router=express.Router();

const bodyparser=require('body-parser');
const urlendcodeParser=bodyparser.urlencoded({extended:false});

var User = require('../controllers/user.controller');

router.get('/', User.getUser);

router.get('/:id', User.getIdUser);

router.post('/create-user', User.createAdminUser);

router.post('/delete-user/:id', urlendcodeParser, User.deleteUser);

router.post('/edit-user/:id', urlendcodeParser, User.editUser);

module.exports = router;