var mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    "code": String,
    "title": String,
    "image_product": String,
    "_category_product": {
        "type": mongoose.Schema.Types.ObjectId,
        "ref": "CategoryProduct"
    },
    "_brand": {
        "type": mongoose.Schema.Types.ObjectId,
        "ref": "BrandProduct"
    },
    "_user": {
        "type": mongoose.Schema.Types.ObjectId,
        "ref": "User"
    },
    "description": String,
    "size": String,
    "price": Number,
    "old_price": Number,
    "quantity": Number,
    "ordered": Number,
    "created_at": {
        "type" : Date,
        "default": Date.now()
    },
    "updated_at": Date
});

module.exports = mongoose.model("Product", productSchema);