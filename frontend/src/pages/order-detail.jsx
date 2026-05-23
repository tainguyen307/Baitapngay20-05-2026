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
            <div>
                <h2>
                    Order
                    Detail
                </h2>

                <p>
                    ID:
                    {
                        order._id
                    }
                </p>

                <p>
                    Total:
                    $
                    {
                        order.totalPrice
                    }
                </p>

                <OrderStatusBadge
                    status={
                        order.status
                    }
                />

                <h3>
                    Timeline
                </h3>

                <OrderTimeline
                    status={
                        order.status
                    }
                />

                <h3>
                    Items
                </h3>

                {order.items.map(
                    (
                        item
                    ) => (
                        <div
                            key={
                                item.product
                            }
                        >
                            {
                                item.name
                            }
                            {" - "}
                            {
                                item.quantity
                            }
                            x $
                            {
                                item.price
                            }
                        </div>
                    )
                )}

                {(order.status ===
                    "NEW" ||
                    order.status ===
                        "PREPARING") && (
                    <button
                        onClick={
                            handleCancel
                        }
                    >
                        Cancel
                        Order
                    </button>
                )}
            </div>
        );
    };

export default OrderDetail;