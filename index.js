var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
// var ProductKidController = require("./server/controllers/productKid.controller");
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.listen(3001);

//set body-parse

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//set connect database
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  "mongodb+srv://admin:admin@cluster0-jfvq1.mongodb.net/Fashi?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log("Mongo connected error: " + err);
    } else {
      console.log("Mongo connected successfull !");
    }
  }
);

// upload image
var multer = require("multer");
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
app.get("/", (req, res) => {
  res.render("Home");
});
app.get("/shop", (req, res) => {
  res.render("pages/shop");
});
app.get("/shop-men", (req, res) => {
  res.render("pages/shop-men");
});
app.get("/shop-women", (req, res) => {
    res.render("pages/shop-women");
  });
app.get("/shop-kids", (req, res) => {
    res.render("pages/shop-kids");
  });
app.get("/admin", (req, res) => {
  res.render("pages/admin/home-admin", { page: "admin-shop-men" });
});
// app.get("/admin/page/:p", (req, res) => {
//   res.render("pages/admin/home-admin", { page: req.params.p });
// });
//models
const ProductKid = require("./server/models/ProductKid");
app.post("/admin/page/admin-shop-kid", function(req, res) {
  // var pro = new ProductKid({
  //     title: "T-Shirt",
  //     image: 'abc',
  //     brand: 'Kevin',
  //     price: 123,
  //     discount: 120,
  //     ordering: 1,
  //     active: 1
  // });
  // pro.save((err) => {
  //     if(err) {
  //         console.log("Save Product Kid Error: "+ err);
  //     } else {
  //         console.log("Save Product Kid Successfull!" + pro._id);
  //         res.json({result: 'ok'});
  //     }
  // })
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
        var pro = new ProductKid({
          title: req.body.txtName,
          category: req.body.txtCategory,
          image: req.file.filename,
          brand: req.body.txtMaker,
          price: req.body.txtPrice,
          discount: req.body.txtDiscount,
          ordering: 1,
          active: 1
        });
        pro.save(err => {
          if (err) {
            console.log("Save Product Kid Error: " + err);
          } else {
            console.log("Save Product Kid Successfull!" + pro._id);
            
          }
        });
      }
    }
  });
});
app.get("/admin/page/admin-shop-kid", (req, res) => {
    ProductKid.find( (err, items) => {
        if(err) {
            console.log(err);
            res.render("pages/admin/home-admin",{page: "admin-shop-kid", pros:[]});
        } else {
            console.log(items);
            res.render("pages/admin/home-admin",{page: "admin-shop-kid", pros: items});
        }
    });
});
