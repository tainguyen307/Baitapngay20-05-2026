const express = require('express');
const auth = require('../middleware/auth');
const upload = require("../middleware/upload");
const checkAdminRole = require('../middleware/adminAuth');
const {
  // Categories
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  // Products
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  // Orders
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  // Users
  getAllUsers,
  getUserById,
  updateUserRole,
  // Dashboard
  getDashboardStats,
} = require('../controllers/adminController');

const routerAdmin = express.Router();

// Apply authentication and admin role check to all admin routes
routerAdmin.use(auth);
routerAdmin.use(checkAdminRole);

// ================= DASHBOARD =================
routerAdmin.get('/dashboard/stats', getDashboardStats);

// ================= CATEGORIES =================
routerAdmin.get('/categories', getAllCategories);
routerAdmin.get('/categories/:id', getCategoryById);
routerAdmin.post('/categories', createCategory);
routerAdmin.put('/categories/:id', updateCategory);
routerAdmin.delete('/categories/:id', deleteCategory);

// ================= PRODUCTS =================
routerAdmin.get('/products', getAllProducts);
routerAdmin.get('/products/:id', getProductById);
routerAdmin.post('/products', upload.array("images", 5), createProduct);
routerAdmin.put('/products/:id', upload.array("images", 5), updateProduct);
routerAdmin.delete('/products/:id', deleteProduct);

// ================= ORDERS =================
routerAdmin.get('/orders', getAllOrders);
routerAdmin.get('/orders/:id', getOrderById);
routerAdmin.put('/orders/:id/status', updateOrderStatus);

// ================= USERS =================
routerAdmin.get('/users', getAllUsers);
routerAdmin.get('/users/:id', getUserById);
routerAdmin.put('/users/:id/role', updateUserRole);

module.exports = routerAdmin;
