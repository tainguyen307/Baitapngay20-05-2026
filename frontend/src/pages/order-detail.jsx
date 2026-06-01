import {
    useEffect,
    useState
} from "react";
import {
    useParams
} from "react-router-dom";
import {
    getOrderDetailAPI,
    cancelOrderAPI
} from "../util/api";
import OrderTimeline from "../components/order/OrderTimeline";
import OrderStatusBadge from "../components/order/OrderStatusBadge";

const OrderDetail =
    () => {
        const { id } =
            useParams();

        const [order, setOrder] =
            useState(
                null
            );

        const fetchOrder =
            async () => {
                const res =
                    await getOrderDetailAPI(
                        id
                    );

                setOrder(
                    res?.data
                );
            };

        useEffect(
            () => {
                fetchOrder();
            },
            [id]
        );

        const handleCancel =
            async () => {
                await cancelOrderAPI(
                    id
                );
                fetchOrder();
            };

        if (!order)
            return (
                <p>
                    Loading...
                </p>
            );

        return (
            <div className="bg-gray-100 min-h-screen py-10">

                <div className="max-w-6xl mx-auto px-6">

                {/* HEADER */}
                <div className="bg-white rounded-3xl p-8 mb-8">

                    <div className="flex flex-col lg:flex-row lg:justify-between gap-5">

                    <div>

                        <p className="text-sm text-gray-400 mb-2">
                        Mã đơn hàng
                        </p>

                        <h1 className="text-3xl font-bold">
                        #{order._id.slice(-8)}
                        </h1>

                        <p className="text-gray-500 mt-3">
                        {new Date(
                            order.createdAt
                        ).toLocaleString("vi-VN")}
                        </p>

                    </div>

                    <div>

                        <OrderStatusBadge
                        status={order.status}
                        />

                    </div>

                    </div>

                </div>

                {/* TIMELINE */}
                <div className="bg-white rounded-3xl p-8 mb-8">

                    <h2 className="text-2xl font-bold mb-6">
                    Trạng thái đơn hàng
                    </h2>

                    <OrderTimeline
                    status={order.status}
                    />

                </div>

                {/* PRODUCTS */}
                <div className="bg-white rounded-3xl p-8 mb-8">

                    <h2 className="text-2xl font-bold mb-6">
                    Sản phẩm đã đặt
                    </h2>

                    <div className="space-y-5">

                    {order.items.map((item) => (

                        <div
                        key={item.product}
                        className="
                            flex
                            justify-between
                            items-center
                            border-b
                            pb-5
                        "
                        >

                        <div>

                            <h3 className="font-semibold text-lg">
                            {item.name}
                            </h3>

                            <p className="text-gray-500">
                            Số lượng: {item.quantity}
                            </p>

                        </div>

                        <div className="text-right">

                            <p className="font-bold text-red-500">
                            {item.price?.toLocaleString()}đ
                            </p>

                        </div>

                        </div>

                    ))}

                    </div>

                </div>

                {/* SHIPPING */}
                <div className="bg-white rounded-3xl p-8 mb-8">

                    <h2 className="text-2xl font-bold mb-6">
                    Địa chỉ giao hàng
                    </h2>

                    <div className="space-y-2">

                    <p>
                        <span className="font-semibold">
                        Người nhận:
                        </span>{" "}
                        {order.shippingAddress?.fullName}
                    </p>

                    <p>
                        <span className="font-semibold">
                        Số điện thoại:
                        </span>{" "}
                        {order.shippingAddress?.phone}
                    </p>

                    <p>
                        <span className="font-semibold">
                        Địa chỉ:
                        </span>{" "}
                        {order.shippingAddress?.address}
                    </p>

                    </div>

                </div>

                {/* PAYMENT */}
                <div className="bg-white rounded-3xl p-8">

                    <h2 className="text-2xl font-bold mb-6">
                    Thanh toán
                    </h2>

                    <div className="space-y-4">

                    <div className="flex justify-between">

                        <span>Tạm tính</span>

                        <span>
                        {order.subtotal?.toLocaleString()}đ
                        </span>

                    </div>

                    <div className="flex justify-between">

                        <span>Phí vận chuyển</span>

                        <span>
                        {order.shippingFee?.toLocaleString()}đ
                        </span>

                    </div>

                    <div className="border-t pt-4 flex justify-between">

                        <span className="font-bold text-xl">
                        Tổng cộng
                        </span>

                        <span className="font-bold text-3xl text-red-500">
                        {order.totalPrice?.toLocaleString()}đ
                        </span>

                    </div>

                    </div>

                    {(order.status === "NEW" ||
                    order.status === "PREPARING") && (

                    <button
                        onClick={handleCancel}
                        className="
                        mt-8
                        h-14
                        px-8
                        rounded-2xl
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        font-semibold
                        transition
                        "
                    >
                        Hủy đơn hàng
                    </button>

                    )}

                </div>

                </div>

            </div>
            );
    };

export default OrderDetail;