var mongoose = require('mongoose');
const productMenSchema = new mongoose.Schema({
    "title": String,
    "category": String,
    "image": String,
    // file: String,
    "brand": String,
    "price": Number,
    "discount": Number,
    "ordering": Number,
    "created_at": {
        "type" : Date,
        "default": Date.now()
    },
    "updated_at": Date
});

module.exports = mongoose.model("ProductMen", productMenSchema);