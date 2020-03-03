const boyParser = require("body-parser");
const mongoose = require("mongoose");
var multer = require("multer");
const ProductWomen = require("../models/ProductWomen");

var store = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

module.exports.getProductWomen = (req, res) => {
  ProductWomen.find((err, items) => {
    if (err) {
      console.log(err);
      res.render("pages/admin/admin-shop-women", { pros: [] });
    } else {
      // console.log(items);
      res.render("pages/admin/admin-shop-women", { pros: items });
    }
  });
};

module.exports.createProductWomen = (req, res, next) => {
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
        var pro = new ProductWomen({
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
            console.log("Save Product Women Error: " + err);
            res.json({
              error: err
            });
          } else {
            console.log("Save Product Women Successfull! " + pro._id);

            res.redirect("http://localhost:3001/admin/page/shop-women/");
          }
        });
      }
    }
  });
};
module.exports.deleteProductWomen = (req, res) => {
  let id = req.params.id;
  ProductWomen.findByIdAndRemove({ _id: id }).then(() => {
    ProductWomen.find((err, items) => {
      if (err) {
        console.log(err);

        res.redirect("http://localhost:3001/admin/page/shop-women/");
      } else {
        console.log("Delete success!");
        res.redirect("http://localhost:3001/admin/page/shop-women/");
      }
    });
  });
};

module.exports.editProductWomen = (req, res) => {
  let id = req.params.id;
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
  }).single("newImage");
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
        ProductWomen.findByIdAndUpdate(
          mongoose.Types.ObjectId(id),
          {
            $set: {
              "title": req.body.Name,
              "category": req.body.Category,
              "image": req.file.filename,
              "brand": req.body.Maker,
              "price": req.body.Price,
              "discount": req.body.Discount,
              "ordering": 1,
              "created_at": Date.now(),
              "updated_at": Date.now()
            }
          },
          { new: true },
          function(err, doc) {
            if (err) throw err;
            else {
              console.log("Save Product Men Successfull! ");
              ProductWomen.find((err, item) => {
                if (err) {
                  console.log(err);

                  res.redirect("http://localhost:3001/admin/page/shop-women/");
                } else {
                  console.log("Edit success!");
                  console.log(item);
                  res.redirect("http://localhost:3001/admin/page/shop-women/");
                }
              });
            }
          }
        );
      }
    }
  });
};
module.exports.getProduct = (req, res) => {
  let id = req.params.id;
  console.log("You choosed --", id);

  ProductWomen.find({ _id: mongoose.Types.ObjectId(id) }, function(
    err,
    product
  ) {
    if (err) {
      console.log(err);
      res.json({
        "status": "fail",
        "data": []
      });
    } else {
      res.json({
        "data": product,
        "status": "success"
      });
    }
  });
};
