const Product = require('../models/product');

const getProducts = async (req, res) => {

    try {

        const {
            search,
            category,
            minPrice,
            maxPrice,
            sort,
            page = 1,
            limit = 12,
        } = req.query;

        const query = {};

        // SEARCH
        if (search) {

            query.name = {
                $regex: search,
                $options: "i"
            };
        }

        // CATEGORY
        if (category) {
            query.category = category;
        }

        // PRICE
        if (minPrice || maxPrice) {

            query.price = {};

            if (minPrice) {
                query.price.$gte =
                    Number(minPrice);
            }

            if (maxPrice) {
                query.price.$lte =
                    Number(maxPrice);
            }
        }

        // SORT
        let sortOption = {};

        switch (sort) {

            case "price_asc":
                sortOption.price = 1;
                break;

            case "price_desc":
                sortOption.price = -1;
                break;

            case "sold":
                sortOption.sold = -1;
                break;

            case "views":
                sortOption.views = -1;
                break;

            case "newest":
                sortOption.createdAt = -1;
                break;

            default:
                sortOption.createdAt = -1;
        }

        // PAGINATION
        const currentPage = Number(page);

        const currentLimit = Number(limit);

        const skip =
            (currentPage - 1) * currentLimit;

        const products =
            await Product.find(query)
                .populate("category")
                .sort(sortOption)
                .skip(skip)
                .limit(currentLimit);

        const total =
            await Product.countDocuments(query);

        return res.status(200).json({

            EC: 0,

            data: {

                products,

                pagination: {

                    total,

                    page: currentPage,

                    limit: currentLimit,

                    totalPages: Math.ceil(
                        total / currentLimit
                    ),
                }
            }
        });

    } catch (error) {

        return res.status(500).json({

            EC: 1,

            message: error.message
        });
    }
};

const createProduct = async (req, res) => {

    try {

        const product =
            await Product.create(req.body);

        return res.status(201).json({

            EC: 0,

            message:
                'Create product success',

            data: product,
        });

    } catch (error) {

        return res.status(500).json({

            EC: 1,

            message: error.message,
        });
    }
};

const getProductDetail = async (
    req,
    res
) => {

    try {

        const { id } = req.params;

        // INCREASE VIEW
        await Product.findByIdAndUpdate(
            id,
            {
                $inc: { views: 1 }
            }
        );

        const product =
            await Product.findById(id)
                .populate("category");

        if (!product) {

            return res.status(404).json({

                EC: 1,

                message:
                    "Product not found"
            });
        }

        // RELATED PRODUCTS
        const relatedProducts =
            await Product.find({

                category:
                    product.category?._id,

                _id: {
                    $ne: product._id
                }

            })
                .limit(10)
                .populate("category");

        return res.status(200).json({

            EC: 0,

            data: {
                product,
                relatedProducts
            }
        });

    } catch (error) {

        return res.status(500).json({

            EC: 1,

            message: error.message
        });
    }
};

const getTopSellingProducts = async (
    req,
    res
) => {

    try {

        const {
            page = 1,
            limit = 10
        } = req.query;

        const currentPage =
            Number(page);

        const currentLimit =
            Number(limit);

        const skip =
            (currentPage - 1)
            * currentLimit;

        const products =
            await Product.find()
                .populate("category")
                .sort({ sold: -1 })
                .skip(skip)
                .limit(currentLimit);

        const total =
            await Product.countDocuments();

        return res.status(200).json({

            EC: 0,

            data: {

                products,

                pagination: {

                    total,

                    page: currentPage,

                    limit: currentLimit,

                    totalPages: Math.ceil(
                        total / currentLimit
                    )
                }
            }
        });

    } catch (error) {

        return res.status(500).json({

            EC: 1,

            message: error.message
        });
    }
};

const getTopViewedProducts = async (
    req,
    res
) => {

    try {

        const {
            page = 1,
            limit = 10
        } = req.query;

        const currentPage =
            Number(page);

        const currentLimit =
            Number(limit);

        const skip =
            (currentPage - 1)
            * currentLimit;

        const products =
            await Product.find()
                .populate("category")
                .sort({ views: -1 })
                .skip(skip)
                .limit(currentLimit);

        const total =
            await Product.countDocuments();

        return res.status(200).json({

            EC: 0,

            data: {

                products,

                pagination: {

                    total,

                    page: currentPage,

                    limit: currentLimit,

                    totalPages: Math.ceil(
                        total / currentLimit
                    )
                }
            }
        });

    } catch (error) {

        return res.status(500).json({

            EC: 1,

            message: error.message
        });
    }
};

module.exports = {
    getProducts,
    createProduct,
    getProductDetail,
    getTopSellingProducts,
    getTopViewedProducts
};