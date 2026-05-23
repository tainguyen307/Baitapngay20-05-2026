const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String
    },
    { _id: false }
);

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        items: [orderItemSchema],

        shippingAddress: {
            fullName: String,
            phone: String,
            address: String
        },

        subtotal: Number,
        shippingFee: Number,
        totalPrice: Number,

        paymentMethod: {
            type: String,
            enum: ["COD"],
            default: "COD"
        },

        paymentStatus: {
            type: String,
            enum: [
                "PENDING",
                "PAID",
                "FAILED"
            ],
            default: "PENDING"
        },

        status: {
            type: String,
            enum: [
                "NEW",
                "CONFIRMED",
                "PREPARING",
                "SHIPPING",
                "DELIVERED",
                "CANCELLED",
                "CANCEL_REQUESTED"
            ],
            default: "NEW"
        },

        cancelledAt: Date,
        deliveredAt: Date
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model(
    "Order",
    orderSchema
);

module.exports = Order;