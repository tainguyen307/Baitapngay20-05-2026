const Product = require('../models/product');

const fetchProducts = async (
    page = 1,
    limit = 8,
    categoryId = null
) => {

    const skip = (page - 1) * limit;

    let query = {};

    if (categoryId) {
        query.category = categoryId;
    }

    const products = await Product.find(query)
        .populate('category')
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 });

    const totalProducts = await Product.countDocuments(query);

    return {
        products,
        pagination: {
            currentPage: page,
            limit,
            totalProducts,
            totalPages: Math.ceil(
                totalProducts / limit
            )
        }
    };
};

const fetchTopSellingProducts = async (
    page = 1,
    limit = 10
) => {

    const skip = (page - 1) * limit;

    const products = await Product.find()
        .populate('category')
        .sort({ sold: -1 })
        .skip(skip)
        .limit(limit);

    const totalProducts =
        await Product.countDocuments();

    return {
        products,
        pagination: {
            currentPage: page,
            limit,
            totalProducts,
            totalPages: Math.ceil(
                totalProducts / limit
            )
        }
    };
};

const fetchTopViewedProducts = async (
    page = 1,
    limit = 10
) => {

    const skip = (page - 1) * limit;

    const products = await Product.find()
        .populate('category')
        .sort({ views: -1 })
        .skip(skip)
        .limit(limit);

    const totalProducts =
        await Product.countDocuments();

    return {
        products,
        pagination: {
            currentPage: page,
            limit,
            totalProducts,
            totalPages: Math.ceil(
                totalProducts / limit
            )
        }
    };
};

const createNewProduct = async (data) => {

    const product = await Product.create(data);

    return product;
};

const increaseProductView = async (
    productId
) => {

    const product =
        await Product.findByIdAndUpdate(
            productId,
            {
                $inc: { views: 1 }
            },
            { new: true }
        );

    return product;
};

module.exports = {
    fetchProducts,
    fetchTopSellingProducts,
    fetchTopViewedProducts,
    createNewProduct,
    increaseProductView
};