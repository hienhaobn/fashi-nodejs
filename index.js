var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
const ProductMenRouter = require('./server/routers/product-men-router');
const ProductWomenRouter = require('./server/routers/product-women-router');
const ProductKidRouter = require('./server/routers/product-kid-router');
const UserRouter = require('./server/routers/user.router');
const LoginRouter = require('./server/routers/customer/login.router');
const RegisterRouter = require('./server/routers/customer/register.router');

// var ProductKidController = require("./server/controllers/productKid.controller");
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.listen(3001);

//set body-parse

// support parsing of application/json type post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
// app.get("/login", (req, res) => {
//     res.render("pages/login");
// });
app.use('/login', LoginRouter);
app.use('/register', RegisterRouter);

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

app.use('/admin/page/shop-men', ProductMenRouter);
app.use('/admin/page/shop-women', ProductWomenRouter);
app.use('/admin/page/shop-kid', ProductKidRouter);
app.use('/admin/page/admin-user', UserRouter);

