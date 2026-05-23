const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    name: String,

    price: Number,

    description: String,

    stock: Number,

    sold: {
        type: Number,
        default: 0
    },

    images: [String],

    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }

}, {
    timestamps: true
});

module.exports = mongoose.model(
    "Product",
    productSchema
);