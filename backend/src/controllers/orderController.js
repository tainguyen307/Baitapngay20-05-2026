const orderService = require(
    "../services/orderService"
);

const createOrder =
    async (req, res) => {
        try {
            const userId =
                req.user.id;

            const order =
                await orderService.createOrder(
                    userId,
                    req.body.shippingAddress
                );

            return res.json({
                success: true,
                data: order
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

const getMyOrders =
    async (req, res) => {
        try {
            const orders =
                await orderService.getMyOrders(
                    req.user.id
                );

            return res.json({
                success: true,
                data: orders
            });
        } catch (error) {
            return res
                .status(500)
                .json({
                    success:
                        false,
                    message:
                        error.message
                });
        }
    };

const getOrderDetail =
    async (req, res) => {
        try {
            const order =
                await orderService.getOrderDetail(
                    req.user.id,
                    req.params.id
                );

            return res.json({
                success: true,
                data: order
            });
        } catch (error) {
            return res
                .status(404)
                .json({
                    success:
                        false,
                    message:
                        error.message
                });
        }
    };

const cancelOrder =
    async (req, res) => {
        try {
            const order =
                await orderService.cancelOrder(
                    req.user.id,
                    req.params.id
                );

            return res.json({
                success: true,
                data: order
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
    createOrder,
    getMyOrders,
    getOrderDetail,
    cancelOrder
};