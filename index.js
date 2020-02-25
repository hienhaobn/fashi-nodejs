var express = require("express");
var app = express();
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));
app.listen(3001);

var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@cluster0-jfvq1.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true}, (err) =>{
    if(err){
        console.log("Mongo connected error: "+err);
    } else {
        console.log("Mongo connected successfull !");
    }
});

app.get("/", (req, res) => {
    res.render("Home");
});
app.get("/shop", (req, res) => {
    res.render("pages/shop");
});
app.get("/shop/:page", (req, res) => {
    res.render("pages/shop-product");
});
app.get("/admin", (req, res) => {
    res.render("pages/admin/home-admin")
});
