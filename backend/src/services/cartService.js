const redis = require("../config/redis");
const Product = require("../models/product");

const getCartKey = (userId) => `cart:${userId}`;

const getCart = async (userId) => {
    const cart = await redis.get(getCartKey(userId));

    if (!cart) {
        return {
            items: [],
            subtotal: 0,
            totalQuantity: 0
        };
    }

    return JSON.parse(cart);
};

const saveCart = async (userId, cart) => {
    await redis.set(
        getCartKey(userId),
        JSON.stringify(cart)
    );
    return cart;
};

const recalcCart = (cart) => {
    cart.totalQuantity = cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    cart.subtotal = cart.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return cart;
};

const addToCart = async (
    userId,
    productId,
    quantity = 1
) => {
    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    const cart = await getCart(userId);

    const existingItem = cart.items.find(
        item =>
            item.product.toString() ===
            productId.toString()
    );

    if (existingItem) {
        const newQty =
            existingItem.quantity + quantity;

        if (newQty > product.stock) {
            throw new Error("Out of stock");
        }

        existingItem.quantity = newQty;
    } else {
        if (quantity > product.stock) {
            throw new Error("Out of stock");
        }

        cart.items.push({
            product: product._id.toString(),
            name: product.name,
            price: product.price,
            image:
                product.images?.[0] || "",
            quantity
        });
    }

    recalcCart(cart);

    return await saveCart(userId, cart);
};

const updateCartItem = async (
    userId,
    productId,
    quantity
) => {
    const product =
        await Product.findById(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    if (quantity > product.stock) {
        throw new Error("Out of stock");
    }

    const cart = await getCart(userId);

    const item = cart.items.find(
        i =>
            i.product.toString() ===
            productId.toString()
    );

    if (!item) {
        throw new Error("Item not found");
    }

    item.quantity = quantity;

    recalcCart(cart);

    return await saveCart(userId, cart);
};

const removeCartItem = async (
    userId,
    productId
) => {
    const cart = await getCart(userId);

    cart.items = cart.items.filter(
        item =>
            item.product.toString() !==
            productId.toString()
    );

    recalcCart(cart);

    return await saveCart(userId, cart);
};

const clearCart = async (userId) => {
    await redis.del(getCartKey(userId));
};

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart
};