import axios from './axios.customize';

// =========================
// AUTH
// =========================

const createUserApi = (
    name,
    email,
    password
) => {

    return axios.post(
        "/v1/api/register",
        {
            name,
            email,
            password
        }
    );
};

const loginApi = (
    email,
    password
) => {

    return axios.post(
        "/v1/api/login",
        {
            email,
            password
        }
    );
};

const getUserApi = () => {

    return axios.get(
        "/v1/api/user"
    );
};

// =========================
// PRODUCTS
// =========================

const fetchProductsApi = (
    query = ""
) => {

    return axios.get(
        `/v1/api/products?${query}`
    );
};

const fetchProductDetailApi = (
    id
) => {

    return axios.get(
        `/v1/api/products/${id}`
    );
};

const createProductApi = (
    data
) => {

    return axios.post(
        "/v1/api/products",
        data
    );
};

// =========================
// TOP PRODUCTS
// =========================

const fetchTopSellingApi = (
    page = 1,
    limit = 10
) => {

    return axios.get(
        `/v1/api/products/top-selling?page=${page}&limit=${limit}`
    );
};

const fetchTopViewedApi = (
    page = 1,
    limit = 10
) => {

    return axios.get(
        `/v1/api/products/top-viewed?page=${page}&limit=${limit}`
    );
};

// =========================
// CATEGORY
// =========================

const fetchCategoriesApi = () => {

    return axios.get(
        "/v1/api/categories"
    );
};

const createCategoryApi = (
    data
) => {

    return axios.post(
        "/v1/api/categories",
        data
    );
};

// =========================
// CART
// =========================

const getCartAPI = () => {

    return axios.get(
        "/v1/api/cart"
    );
};

const addToCartAPI = (
    data
) => {

    return axios.post(
        "/v1/api/cart/add",
        data
    );
};

const updateCartAPI = (
    product,
    quantity
) => {

    return axios.put(
        `/v1/api/cart/update/`,
        {
            product,
            quantity
        }
    );
};

const deleteCartAPI = (
    product
) => {

    return axios.delete(
        `/v1/api/cart/${product}`
    );
};

// =========================
// ORDER
// =========================

const createOrderAPI = (
    data
) => {
    return axios.post(
        "/v1/api/orders/checkout",
        data
    );
};

const getOrdersAPI = (
    page = 1,
    limit = 10
) => {
    return axios.get(
        `/v1/api/orders?page=${page}&limit=${limit}`
    );
};

const getOrderDetailAPI = (
    id
) => {
    return axios.get(
        `/v1/api/orders/${id}`
    );
};

const cancelOrderAPI = (
    id
) => {
    return axios.put(
        `/v1/api/orders/${id}/cancel`
    );
};

export {

    // AUTH
    createUserApi,
    loginApi,
    getUserApi,

    // PRODUCTS
    fetchProductsApi,
    fetchProductDetailApi,
    createProductApi,

    // TOP PRODUCTS
    fetchTopSellingApi,
    fetchTopViewedApi,

    // CATEGORY
    fetchCategoriesApi,
    createCategoryApi,

    // CART
    getCartAPI,
    addToCartAPI,
    updateCartAPI,
    deleteCartAPI,

    // ORDER
    createOrderAPI,
    getOrdersAPI,
    getOrderDetailAPI,
    cancelOrderAPI
};