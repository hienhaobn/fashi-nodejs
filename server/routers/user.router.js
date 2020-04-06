const express=require('express');
const router=express.Router();

const bodyparser=require('body-parser');
const urlendcodeParser=bodyparser.urlencoded({extended:false});

var User = require('../controllers/user.controller');

router.get('/admin-user', User.getUser);

router.get('/admin-user/:id', User.getIdUser);

router.get('/detail-user', User.getDetailUser);

router.post('/admin-user/create-user', User.createAdminUser);

router.post('/admin-user/delete-user/:id', urlendcodeParser, User.deleteUser);

router.post('/admin-user/edit-user/:id', urlendcodeParser, User.editUser);

module.exports = router;