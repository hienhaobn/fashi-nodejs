var mongoose = require('mongoose');
const productKidSchema = new mongoose.Schema({
    title: String,
    category: String,
    image: String,
    // file: String,
    brand: String,
    price: Number,
    discount: Number,
    ordering: Number,
    active: Number
});

module.exports = mongoose.model("ProductKid", productKidSchema);