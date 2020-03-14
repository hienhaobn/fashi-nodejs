const mongoose = require("mongoose");
const User = require("../models/User");

module.exports.getUser = (req, res) => {
    User.find((err, users) => {
        if (err) {
          console.log(err);
          res.render("pages/admin/admin-user", { users: [] });
        } else {
          res.render("pages/admin/admin-user", { users: users });
        }
      });
};

module.exports.getIdUser = (req, res) => {
    let id = req.params.id;
    console.log("You choosed --", id);
  
    User.find({ _id: mongoose.Types.ObjectId(id) }, function(
      err,
      user
    ) {
      if (err) {
        console.log(err);
        res.json({
          "status": "fail",
          "data": []
        });
      } else {
        res.json({
          "data": user,
          "status": "success"
        });
      }
    });
};

module.exports.createAdminUser = (req, res) => {
    var username = req.body.txtName;
    var password = req.body.txtPassword;
    if(username !== null && password !== null && username !== undefined && password !== undefined) {
        var user = new User({
            "username": req.body.txtName,
            "password":  req.body.txtPassword,
            "role": 1,
            "create_at": Date.now()
        });
        user.save(err => {
            if(err){
                console.log("Create account fail!");
                // res.json({
                //     "message": "Fail",
                //     "status": 404
                // });
            } else {
                console.log("Create account successfull! ", user);
                res.redirect("http://localhost:3001/admin/page/admin-user");
            }
        });
    } else {
        console.log("Username or Password wrong!!");
        res.redirect("http://localhost:3001/admin/page/admin-user");
    }
};
module.exports.createUser = (req, res) => {
    var username = req.body.txtName;
    var password = req.body.txtPassword;
    console.log(username, password);
    if(username !== null && password !== null && username !== undefined && password !== undefined) {
        var user = new User({
            "username": req.body.txtName,
            "password":  req.body.txtPassword,
            "role": 2,
            "create_at": Date.now()
        });
        user.save(err => {
            if(err){
                console.log("Create account fail!");
                res.json({
                    "message": "Fail",
                    "status": 404
                });
            } else {
                console.log("Create account successfull! ", user.username);
                res.redirect("http://localhost:3001/home");
            }
        });
    } else {
        console.log("Username or Password wrong!!");
        res.redirect("http://localhost:3001/home");
    }
};
module.exports.deleteUser = (req, res) => {
    let id = req.params.id;
    User.findByIdAndRemove({ _id: id }).then(() => {
      User.find((err, user) => {
        if (err) {
          console.log(err);
  
          res.redirect("http://localhost:3001/admin/page/admin-user/");
        } else {
          console.log("Delete user success!");
          res.redirect("http://localhost:3001/admin/page/admin-user/");
        }
      });
    });
};

module.exports.editUser = (req, res) => {
    let id = req.params.id;
    User.findByIdAndUpdate(
        mongoose.Types.ObjectId(id),
        {
          $set: {
            "username": req.body.Name,
            "password": req.body.newPassword,
            "updated_at": Date.now()
          }
        },
        { new: true },
        function(err, doc) {
          if (err) throw err;
          else {
            User.find((err, user) => {
              if (err) {
                console.log(err);
                res.redirect("http://localhost:3001/admin/page/admin-user/");
              } else {
                console.log("Edit success!");
                res.redirect("http://localhost:3001/admin/page/admin-user/");
              }
            });
          }
        }
      );
};

