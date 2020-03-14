var mongoose = require('mongoose');
const User = new mongoose.Schema({
    "username": String,
    "password": String,
    "role": Number,
    "avatar": String,
    "created_at": {
        "type" : Date,
        "default": Date.now()
    },
    "updated_at": Date
});

module.exports = mongoose.model("User", User);