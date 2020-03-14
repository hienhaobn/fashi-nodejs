var  User = require('../../models/User');
const mongoose = require('mongoose');

module.exports.getRegisterForm = (req, res) => {
    res.render('pages/register.ejs');
};

module.exports.postRegisterForm = (req, res) => {
    var username = req.body.name;
    var password = req.body.pass;

    if(username !== null && password !== null && username !== undefined && password !== undefined) {
        var user = new User({
            "username": username,
            "password":  password,
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
                res.redirect("http://localhost:3001");
            }
        });
    } else {
        console.log("Username or Password wrong!!");
        res.redirect("http://localhost:3001");
    }
};