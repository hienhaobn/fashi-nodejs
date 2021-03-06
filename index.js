var express = require("express");
var app = express();
const bodyParser = require("body-parser");
var mongoose = require("mongoose");
const UserRouter = require('./server/routers/user.router');
const LoginRouter = require('./server/routers/customer/login.router');
const RegisterRouter = require('./server/routers/customer/register.router');
const BlogAdmin = require('./server/routers/blog.router');
const StatisticAdmin = require('./server/routers/statistic.router');
const OrderAdmin = require('./server/routers/order.router');
const ProductAmin = require('./server/routers/product.router');
const ProductCustomer = require('./server/routers/customer/shop.router');
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
  "mongodb://localhost:27017/fashi",
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

app.get("/blog", (req, res) => {
    res.render("pages/blog-customer");
});
app.get("/blog-details", (req, res) => {
    res.render("pages/blog-details-customer");
});
app.get("/checkout", (req, res) => {
    res.render("pages/checkout");
});

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
app.use('/', ProductCustomer);
app.use('/admin/page', UserRouter);
app.use('/admin/page', BlogAdmin);
app.use('/admin/page', StatisticAdmin);
app.use('/admin/page', OrderAdmin);
app.use('/admin/page', ProductAmin);
