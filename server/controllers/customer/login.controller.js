const mongoose = require("mongoose");
const User = require("../../models/User");

module.exports.getLogin = (req, res) => {
  res.render("pages/login.ejs");
};

module.exports.RedirectLogin = (req, res, next) => {
  var username = req.body.txtName;
  var password = req.body.txtPassword;
  var err = 'Đăng nhập không thành công';
  console.log(password);
  User.find({ username: username ,password: password }).then(function(result) {
    if (Object.keys(result).length !== 0) {
      User.find({ _id: mongoose.Types.ObjectId(result[0]._id) }).then(data => {
        data.forEach(data => {
          if (data.role == 0 || data.role == 1) {
            res.statusCode = 201;
            res.setHeader("Content-Type", "text/plain");
            res.redirect("http://localhost:3001/admin/page/shop-men/");
            res.end(data);
          } else {
            res.statusCode = 201;
            res.setHeader("Content-Type", "text/plain");
            res.redirect("http://localhost:3001/");
            res.end(data);
          }
        });
      });
    } else {
      res.render("pages/login", {err: err});
    
    }
  });

};
