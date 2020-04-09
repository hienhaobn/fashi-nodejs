const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoryProductSchema = new Schema( {
    "name": String,
    "products": [{
        "type": mongoose.Schema.Types.ObjectId,
        "ref": "Product"
    }],
    "type_product": String,
    "status": Boolean,
    "created_at": {
        "type" : Date,
        "default": Date.now()
    },
    "updated_at": Date
} );

module.exports = mongoose.model("CategoryProduct", categoryProductSchema);
