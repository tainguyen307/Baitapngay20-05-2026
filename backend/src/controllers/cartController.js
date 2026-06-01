const cartService = require(
    "../services/cartService"
);

const getCart = async (
    req,
    res
) => {
    try {
        const userId =
            req.user.id;

        const cart =
            await cartService.getCart(
                userId
            );

        return res.json({
            success: true,
            data: cart
        });
    } catch (error) {
        return res
            .status(500)
            .json({
                success: false,
                message:
                    error.message
            });
    }
};

const addToCart = async (
    req,
    res
) => {
    try {
        const userId =
            req.user.id;
        const {
            productId,
            quantity
        } = req.body;

        const cart =
            await cartService.addToCart(
                userId,
                productId,
                quantity
            );

        return res.json({
            success: true,
            data: cart
        });
    } catch (error) {
        return res
            .status(400)
            .json({
                success: false,
                message:
                    error.message
            });
    }
};

const updateCartItem =
    async (req, res) => {
        try {
            const userId =
                req.user.id;
            const {
                product,
                quantity
            } = req.body;

            const cart =
                await cartService.updateCartItem(
                    userId,
                    product,
                    quantity
                );

            return res.json({
                success: true,
                data: cart
            });
        } catch (error) {
            return res
                .status(400)
                .json({
                    success:
                        false,
                    message:
                        error.message
                });
        }
    };

const removeCartItem =
    async (req, res) => {
        try {
            const userId =
                req.user.id;
            const {
                productId
            } = req.params;

            const cart =
                await cartService.removeCartItem(
                    userId,
                    productId
                );

            return res.json({
                success: true,
                data: cart
            });
        } catch (error) {
            return res
                .status(400)
                .json({
                    success:
                        false,
                    message:
                        error.message
                });
        }
    };

module.exports = {
    getCart,
    addToCart,
    updateCartItem,
    removeCartItem
};