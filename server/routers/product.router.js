const express=require('express');
const router = require( "express-promise-router" )();
var multer = require("multer");

var ProductController = require('../controllers/product.controller');
var store = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/upload/help/product");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    }
  });
// const upload = multer( {
//     "storage": store,
//     "limits": {
//         "fileSize": 1024 * 1024 * 25
//     },
//     "fileFilter": function( req, file, cb ) {
//         if ( !file.originalname.match( /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/ ) ) {
//         return cb( new Error( "Ảnh không đúng dạng, vui lòng thử lại!" ) );
//         }
//         cb( null, true );
//     }
// } );
var upload = multer({
    storage: store,
    limits: {
      fileSize: 1024 * 1024 * 25
    },
    fileFilter: (req, file, cb) => {
      console.log(file);
      if (
        file.mimetype == "image/bmp" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/gif" ||
        file.mimetype == "image/jpg" ||
        file.mimetype == "image/jpeg"
      ) {
        cb(null, true);
      } else {
        return cb(new Error("Only image are allowed!"));
      }
    }
});
router.get('/list-product', ProductController.getListProduct);
router.get('/list-brand', ProductController.getListBrand);
router.get('/list-category-product', ProductController.getListCategoryProduct);

//category
// trong truong hop loi get product can xem lai router get nay 
router.get('/get-category/:id',ProductController.getCategory);
router.post('/add-category', ProductController.addCategory);
router.post('/delete-category/:id', ProductController.deleteCategory);
router.post('/update-category/:id', ProductController.updateCategory);

//brand
router.get('/get-brand/:id', ProductController.getBrand);
router.post('/add-brand', ProductController.addBrand);
router.post('/delete-brand', ProductController.deleteBrand);
router.post('/update-brand/:id', ProductController.updateBrand);

//product 

router.get('/get-product/:id', ProductController.getProduct);
router.post('/add-product',upload.single('file'), ProductController.addProduct);
router.post('/delete-product', ProductController.deleteProduct);
router.post('/update-product/:id', ProductController.updateProduct);
module.exports = router;