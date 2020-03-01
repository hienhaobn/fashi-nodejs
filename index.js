var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
var multer = require("multer");
const ProductKid = require("./server/models/ProductKid");
const ProductMen = require("./server/models/ProductMen");
const ProductWomen = require("./server/models/ProductWomen");
const ProductMenRouter = require('./server/routers/product-men-router');
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
app.get("/blog", (req, res) => {
    res.render("pages/blog-customer");
});
app.get("/blog-details", (req, res) => {
    res.render("pages/blog-details-customer");
});
app.get("/checkout", (req, res) => {
    res.render("pages/checkout");
});
app.get("/login", (req, res) => {
    res.render("pages/login");
});
app.get("/register", (req, res) => {
    res.render("pages/register");
});
app.get("/shopping-cart", (req, res) => {
    res.render("pages/shopping-cart");
});
app.get("/product", (req, res) => {
    res.render("pages/product");
});
// route admin
app.get("/admin", (req, res) => {
  res.render("pages/admin/home-admin");
});
// app.get("/admin/page/admin-shop-men", (req, res) => {
//     ProductMen.find( (err, items) => {
//         if(err) {
//             console.log(err);
//             res.render("pages/admin/admin-shop-men",{pros:[]});
//         } else {
//             // console.log(items);
//             res.render("pages/admin/admin-shop-men",{pros: items});
//         }
//     });
// });
app.get("/admin/page/admin-shop-women", (req, res) => {
    res.render("pages/admin/admin-shop-women");
});
app.get("/admin/page/admin-shop-kid", (req, res) => {
    res.render("pages/admin/admin-shop-kid");
});
app.get("/admin/page/admin-user", (req, res) => {
    res.render("pages/admin/admin-user");
});

//models

// app.post("/admin/page/admin-shop-men", function(req, res) {
//     upload(req, res, err => {
//       if (err instanceof multer.MulterError) {
//         console.log("A Multer error occurred when uploading");
//         res.json({ result: 0 });
//       } else {
//         console.log("Upload is okay");
//         console.log(req.file); // infomation file uploaded
//         if (req.body.txtUn && req.body.txtPa) {
//           res.json({ file: req.file.filename });
//         } else {
//           var pro = new ProductMen({
//             "title": req.body.txtName,
//             "category": req.body.txtCategory,
//             "image": req.file.filename,
//             "brand": req.body.txtMaker,
//             "price": req.body.txtPrice,
//             "discount": req.body.txtDiscount,
//             "ordering": 1,
//             "created_at": Date.now()
//           });
//           pro.save(err => {
//             if (err) {
//                 console.log("Save Product Men Error: " + err);
//             } else {
//                 console.log("Save Product Men Successfull!" + pro._id);
//                 ProductMen.find( (err, items) => {
//                     if(err) {
//                         console.log(err);
//                         // res.json({
//                         //     error: err,
//                         //     message: "Thêm sản phẩm thất bại"
//                         // })
//                         res.render("pages/admin/admin-shop-men",{pros:[]});
//                     } else {
//                         // console.log(items);
//                         // res.json({
//                         //     pros: items,
//                         //     message: "Thêm sản phẩm thành công"
//                         // });
//                         res.render("pages/admin/admin-shop-men",{pros: items});
//                     }
//                 });
//             }
//           });
//         }
//       }
//     });
//   });
app.use('/admin/page/shop-men', ProductMenRouter);

