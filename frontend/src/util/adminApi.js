import axios from './axios.customize';

// =========================
// ADMIN - DASHBOARD
// =========================

const getAdminDashboardStatsApi = () => {
  return axios.get("/v1/admin/dashboard/stats");
};

// =========================
// ADMIN - CATEGORIES
// =========================

const getAdminCategoriesApi = () => {
  return axios.get("/v1/admin/categories");
};

const getAdminCategoryByIdApi = (id) => {
  return axios.get(`/v1/admin/categories/${id}`);
};

const createAdminCategoryApi = (data) => {
  return axios.post("/v1/admin/categories", data);
};

const updateAdminCategoryApi = (id, data) => {
  return axios.put(`/v1/admin/categories/${id}`, data);
};

const deleteAdminCategoryApi = (id) => {
  return axios.delete(`/v1/admin/categories/${id}`);
};

// =========================
// ADMIN - PRODUCTS
// =========================

const getAdminProductsApi = () => {
  return axios.get("/v1/admin/products");
};

const getAdminProductByIdApi = (id) => {
  return axios.get(`/v1/admin/products/${id}`);
};

const createAdminProductApi = (data) => {
  return axios.post("/v1/admin/products", data);
};

const updateAdminProductApi = (id, data) => {
  return axios.put(`/v1/admin/products/${id}`, data);
};

const deleteAdminProductApi = (id) => {
  return axios.delete(`/v1/admin/products/${id}`);
};

// =========================
// ADMIN - ORDERS
// =========================

const getAdminOrdersApi = () => {
  return axios.get("/v1/admin/orders");
};

const getAdminOrderByIdApi = (id) => {
  return axios.get(`/v1/admin/orders/${id}`);
};

const updateAdminOrderStatusApi = (id, data) => {
  return axios.put(`/v1/admin/orders/${id}/status`, data);
};

// =========================
// ADMIN - USERS
// =========================

const getAdminUsersApi = () => {
  return axios.get("/v1/admin/users");
};

const getAdminUserByIdApi = (id) => {
  return axios.get(`/v1/admin/users/${id}`);
};

const updateAdminUserRoleApi = (id, data) => {
  return axios.put(`/v1/admin/users/${id}/role`, data);
};

export {
  // Dashboard
  getAdminDashboardStatsApi,
  // Categories
  getAdminCategoriesApi,
  getAdminCategoryByIdApi,
  createAdminCategoryApi,
  updateAdminCategoryApi,
  deleteAdminCategoryApi,
  // Products
  getAdminProductsApi,
  getAdminProductByIdApi,
  createAdminProductApi,
  updateAdminProductApi,
  deleteAdminProductApi,
  // Orders
  getAdminOrdersApi,
  getAdminOrderByIdApi,
  updateAdminOrderStatusApi,
  // Users
  getAdminUsersApi,
  getAdminUserByIdApi,
  updateAdminUserRoleApi,
};
