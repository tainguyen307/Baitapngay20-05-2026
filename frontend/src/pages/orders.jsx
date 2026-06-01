import {
    useEffect,
    useState
} from "react";
import {
    getOrdersAPI
} from "../util/api";
import {
    Link
} from "react-router-dom";
import OrderStatusBadge from "../components/order/OrderStatusBadge";

const Orders = () => {
    const [orders, setOrders] =
        useState([]);

    const fetchOrders =
        async () => {
            const res =
                await getOrdersAPI();

            setOrders(
                res?.data || []
            );
        };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="bg-gray-100 min-h-screen py-10">

            <div className="max-w-6xl mx-auto px-6">

            <div className="mb-8">
                <p className="text-green-600 font-semibold">
                PICKLEBALL STORE
                </p>

                <h1 className="text-4xl font-bold mt-2">
                Đơn hàng của tôi
                </h1>
            </div>

            {orders.length === 0 ? (

                <div className="bg-white rounded-3xl p-12 text-center">

                <h2 className="text-2xl font-bold mb-3">
                    Chưa có đơn hàng
                </h2>

                <p className="text-gray-500 mb-6">
                    Hãy mua sắm để tạo đơn hàng đầu tiên
                </p>

                <Link
                    to="/products"
                    className="
                    inline-flex
                    items-center
                    px-6
                    py-3
                    rounded-xl
                    bg-green-600
                    text-white
                    font-semibold
                    "
                >
                    Mua sắm ngay
                </Link>

                </div>

            ) : (

                <div className="space-y-5">

                {orders.map((order) => (

                    <Link
                    key={order._id}
                    to={`/orders/${order._id}`}
                    >

                    <div
                        className="
                        bg-white
                        rounded-3xl
                        p-6
                        border
                        border-gray-200
                        hover:shadow-xl
                        transition
                        "
                    >

                        <div className="flex justify-between items-start">

                        <div>

                            <p className="text-sm text-gray-400">
                            Mã đơn hàng
                            </p>

                            <h3 className="font-bold text-lg">
                            #{order._id.slice(-8)}
                            </h3>

                        </div>

                        <OrderStatusBadge
                            status={order.status}
                        />

                        </div>

                        <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-3
                            gap-6
                            mt-6
                        "
                        >

                        <div>

                            <p className="text-gray-400 text-sm">
                            Ngày đặt
                            </p>

                            <h4 className="font-semibold">
                            {new Date(
                                order.createdAt
                            ).toLocaleString("vi-VN")}
                            </h4>

                        </div>

                        <div>

                            <p className="text-gray-400 text-sm">
                            Thanh toán
                            </p>

                            <h4 className="font-semibold">
                            {order.paymentMethod}
                            </h4>

                        </div>

                        <div>

                            <p className="text-gray-400 text-sm">
                            Tổng tiền
                            </p>

                            <h4 className="text-2xl font-bold text-red-500">
                            {order.totalPrice?.toLocaleString()}đ
                            </h4>

                        </div>

                        </div>

                        <div className="mt-6 text-right">

                        <span
                            className="
                            text-green-600
                            font-semibold
                            "
                        >
                            Xem chi tiết →
                        </span>

                        </div>

                    </div>

                    </Link>

                ))}

                </div>

            )}

            </div>

        </div>
        );
};

export default Orders;