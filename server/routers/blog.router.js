const express=require('express');
const router=express.Router();

const bodyparser=require('body-parser');
const urlendcodeParser=bodyparser.urlencoded({extended:false});

var BlogControler = require('../controllers/blog.controller');

router.get('/list-blog', BlogControler.getBlog);
router.get('/category-blog', BlogControler.getCategoryBlog);
module.exports = router;