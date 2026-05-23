const Order = require("../models/order");
const Product = require("../models/product");
const cartService = require("./cartService");

const createOrder = async (
    userId,
    shippingAddress
) => {
    const cart = await cartService.getCart(
        userId
    );

    if (!cart.items.length) {
        throw new Error("Cart is empty");
    }

    for (const item of cart.items) {
        const product =
            await Product.findById(
                item.product
            );

        if (!product) {
            throw new Error(
                `Product ${item.name} not found`
            );
        }

        if (
            product.stock < item.quantity
        ) {
            throw new Error(
                `${item.name} out of stock`
            );
        }
    }

    for (const item of cart.items) {
        await Product.findByIdAndUpdate(
            item.product,
            {
                $inc: {
                    stock: -item.quantity
                }
            }
        );
    }

    const shippingFee = 0;
    const subtotal = cart.subtotal;
    const totalPrice =
        subtotal + shippingFee;

    const order =
        await Order.create({
            user: userId,
            items: cart.items,
            shippingAddress,
            subtotal,
            shippingFee,
            totalPrice,
            paymentMethod: "COD",
            paymentStatus: "PENDING",
            status: "NEW"
        });

    await cartService.clearCart(userId);

    return order;
};

const getMyOrders = async (userId) => {
    return await Order.find({
        user: userId
    }).sort({
        createdAt: -1
    });
};

const getOrderDetail = async (
    userId,
    orderId
) => {
    const order =
        await Order.findOne({
            _id: orderId,
            user: userId
        }).populate(
            "items.product"
        );

    if (!order) {
        throw new Error(
            "Order not found"
        );
    }

    return order;
};

const cancelOrder = async (
    userId,
    orderId
) => {
    const order =
        await Order.findOne({
            _id: orderId,
            user: userId
        });

    if (!order) {
        throw new Error(
            "Order not found"
        );
    }

    const now = Date.now();
    const orderTime =
        new Date(
            order.createdAt
        ).getTime();

    const diffMinutes =
        (now - orderTime) /
        (1000 * 60);

    // trước 30 phút => cancel
    if (
        diffMinutes <= 30 &&
        order.status === "NEW"
    ) {
        order.status =
            "CANCELLED";
        order.cancelledAt =
            new Date();

        for (const item of order.items) {
            await Product.findByIdAndUpdate(
                item.product,
                {
                    $inc: {
                        stock:
                            item.quantity
                    }
                }
            );
        }

        await order.save();
        return order;
    }

    // đang chuẩn bị => request
    if (
        order.status ===
        "PREPARING"
    ) {
        order.status =
            "CANCEL_REQUESTED";

        await order.save();
        return order;
    }

    throw new Error(
        "Cannot cancel this order"
    );
};

const updateOrderStatus = async (
    orderId,
    status
) => {
    const order =
        await Order.findById(
            orderId
        );

    if (!order) {
        throw new Error(
            "Order not found"
        );
    }

    order.status = status;

    if (
        status ===
        "DELIVERED"
    ) {
        order.deliveredAt =
            new Date();
        order.paymentStatus =
            "PAID";
    }

    await order.save();
    return order;
};

module.exports = {
    createOrder,
    getMyOrders,
    getOrderDetail,
    cancelOrder,
    updateOrderStatus
};