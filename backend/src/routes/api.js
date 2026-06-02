const express = require('express');
const upload = require("../middleware/upload");

const {
    createUser,
    handleLogin,
    getUser,
    getAccount
} = require('../controllers/userController');

const {
    getProducts,
    createProduct,
    getProductDetail,
    getTopSellingProducts,
    getTopViewedProducts
} = require('../controllers/productController');

const {
    getCategories,
    createCategory
} = require('../controllers/categoryController');

const {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem
} = require('../controllers/cartController');

const {
    createOrder,
    getMyOrders,
    getOrderDetail,
    cancelOrder
} = require('../controllers/orderController');

const auth = require('../middleware/auth');
const delay = require('../middleware/delay');

const routerAPI = express.Router();


// ================= MIDDLEWARE =================
routerAPI.use(auth);


// ================= TEST =================
routerAPI.get("/", (req, res) => {
    return res.status(200).json({
        message: "Hello world api"
    });
});


// ================= AUTH =================
routerAPI.post(
    "/register",
    createUser
);

routerAPI.post(
    "/login",
    handleLogin
);


// ================= USER =================
routerAPI.get(
    "/user",
    getUser
);

routerAPI.get(
    "/account",
    delay,
    getAccount
);


// ================= PRODUCT =================

// GET ALL PRODUCTS
routerAPI.get(
    "/products",
    getProducts
);

// TOP SELLING
routerAPI.get(
    "/products/top-selling",
    getTopSellingProducts
);

// TOP VIEWED
routerAPI.get(
    "/products/top-viewed",
    getTopViewedProducts
);

// PRODUCT DETAIL
routerAPI.get(
    "/products/:id",
    getProductDetail
);

// CREATE PRODUCT
routerAPI.post(
    "/products",
    upload.array("images", 5),
    createProduct
);


// ================= CATEGORY =================
routerAPI.get(
    "/categories",
    getCategories
);

routerAPI.post(
    "/categories",
    createCategory
);


// ================= CART =================

// GET CART
routerAPI.get(
    "/cart",
    getCart
);

// ADD TO CART
routerAPI.post(
    "/cart/add",
    addToCart
);

// UPDATE CART ITEM
routerAPI.put(
    "/cart/update",
    updateCartItem
);

// REMOVE CART ITEM
routerAPI.delete(
    "/cart/:productId",
    removeCartItem
);


// ================= ORDER =================

// CHECKOUT COD
routerAPI.post(
    "/orders/checkout",
    createOrder
);

// MY ORDER HISTORY
routerAPI.get(
    "/orders",
    getMyOrders
);

// ORDER DETAIL
routerAPI.get(
    "/orders/:id",
    getOrderDetail
);

// CANCEL ORDER
routerAPI.put(
    "/orders/:id/cancel",
    cancelOrder
);


module.exports = routerAPI;