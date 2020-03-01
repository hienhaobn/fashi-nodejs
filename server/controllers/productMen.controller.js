const boyParser = require('body-parser');
const mongoose = require('mongoose');
var multer = require("multer");
const ProductMen = require('../models/ProductMen');


var store = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/upload");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
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
}).single("fileImage");



module.exports.getProductMen = (req, res) => {
    ProductMen.find((err, items) => {
        if (err) {
            console.log(err);
            res.render("pages/admin/admin-shop-men", { pros: [] });
        } else {
            // console.log(items);
            res.render("pages/admin/admin-shop-men", { pros: items });
        }
    });
}

module.exports.createProductMen = (req, res, next) => {
    upload(req, res, err => {
        if (err instanceof multer.MulterError) {
            console.log("A Multer error occurred when uploading");
            res.json({ result: 0 });
        } else {
            console.log("Upload is okay");
            console.log(req.file); // infomation file uploaded
            if (req.body.txtUn && req.body.txtPa) {
                res.json({ file: req.file.filename });
            } else {
                var pro = new ProductMen({
                    "title": req.body.txtName,
                    "category": req.body.txtCategory,
                    "image": req.file.filename,
                    "brand": req.body.txtMaker,
                    "price": req.body.txtPrice,
                    "discount": req.body.txtDiscount,
                    "ordering": 1,
                    "created_at": Date.now()
                });
                pro.save(err => {
                    if (err) {
                        console.log("Save Product Men Error: " + err);
                        res.json({
                            error: err
                        });
                    } else {
                        console.log("Save Product Men Successfull! " + pro._id);
                        // ProductMen.find((err, items) => {
                        //     if (err) {
                        //         console.log(err);
                        //         res.render("pages/admin/admin-shop-men", { pros: [] });
                        //     } else {
                        //         // console.log(items);
                        //         res.render("pages/admin/admin-shop-men", { pros: items });
                        //     }
                        // });
                        res.redirect('http://localhost:3001/admin/page/shop-men/');
                    }
                });
            }
        }
    });
};
module.exports.deleteProductMen = (req, res) => {
    let id = req.params.id;
    ProductMen.findByIdAndRemove({_id: id}).then( () => {
        ProductMen.find((err, items) => {
            if (err) {
                console.log(err);
                // res.render("pages/admin/admin-shop-men", { pros: [] });
                res.redirect('http://localhost:3001/admin/page/shop-men/');
            } else {
                // console.log(items);
                // res.render("pages/admin/admin-shop-men", { pros: items });
                console.log("Delete success!");
                res.redirect('http://localhost:3001/admin/page/shop-men/');
                
            }
        });
        
    })
};

module.exports.editProductMen = (req,res) => {
    let id = req.params.id;
    upload(req, res, err => {
        if (err instanceof multer.MulterError) {
            console.log("A Multer error occurred when uploading");
            res.json({ result: 0 });
        } else {
            console.log("Upload is okay");
            console.log(req.file); // infomation file uploaded
            if (req.body.txtUn && req.body.txtPa) {
                res.json({ file: req.file.filename });
            } else {
                ProductMen.findByIdAndUpdate(mongoose.Types.ObjectId(id),
                {
                    $set: {
                        "title": req.body.txtName,
                        "category": req.body.txtCategory,
                        "image": req.file.filename,
                        "brand": req.body.txtMaker,
                        "price": req.body.txtPrice,
                        "discount": req.body.txtDiscount,
                        "ordering": 1,
                        "created_at": Date.now()
                    }
                },{new: true}, function(err, doc) {
                    if(err) throw err
                    else {
                        console.log("Save Product Men Successfull! " + pro._id);
                        ProductMen.find((err, items) => {
                            if (err) {
                                console.log(err);
                                // res.render("pages/admin/admin-shop-men", { pros: [] });
                                res.redirect('http://localhost:3001/admin/page/shop-men/');
                            } else {
                                // console.log(items);
                                // res.render("pages/admin/admin-shop-men", { pros: items });
                                console.log("Edit success!");
                                res.redirect('http://localhost:3001/admin/page/shop-men/');
                            }
                        });
                    }
                }
                )
               
               
            }
        }
    });
};
module.exports.getEditProductMen = (req, res) => {
    let id = req.params.id;
    console.log("-------------------------------", id);
    
    ProductMen.find({_id: mongoose.Types.ObjectId(id)},function(err, product) {
        if (err) {
            console.log(err);
            res.render("pages/admin/admin-edit-product-men", { pros: [] });
        } else {
            // console.log(items);
            // res.render("pages/admin/admin-shop-men", { pros: product });
            res.json(product);
            
        }
    });
}