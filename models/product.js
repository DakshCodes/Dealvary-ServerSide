const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: [true, "can't be blank"]
    },
    description: {
        type: String,
        required: [true, "can't be blank"]
    },
    price: {
        type: String,
        required: [true, "can't be blank"]
    },
    category: {
        type: String,
        required: [true, "can't be blank"]
    },
    pictures: {
        type: Array,
        required: true
    },
}, { minimize: false });


module.exports.User = mongoose.model('Product', schema)