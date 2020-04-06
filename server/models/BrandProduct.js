const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandProductSchema = new Schema( {
    "name": String,
    "products": [{
        "type": mongoose.Schema.Types.ObjectId,
        "ref": "Product"
    }],
    "status": Boolean,
    "created_at": {
        "type" : Date,
        "default": Date.now()
    },
    "updated_at": Date
} );

module.exports = mongoose.model("BrandProduct", brandProductSchema);