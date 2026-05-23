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
        <div>
            <h2>
                Order
                History
            </h2>

            {orders.map(
                (
                    order
                ) => (
                    <div
                        key={
                            order._id
                        }
                        style={{
                            border:
                                "1px solid #ddd",
                            padding:
                                16,
                            marginBottom:
                                16
                        }}
                    >
                        <p>
                            Order:
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

                        <p>
                            Date:
                            {new Date(
                                order.createdAt
                            ).toLocaleString()}
                        </p>

                        <OrderStatusBadge
                            status={
                                order.status
                            }
                        />

                        <br />
                        <br />

                        <Link
                            to={`/orders/${order._id}`}
                        >
                            View
                            Detail
                        </Link>
                    </div>
                )
            )}
        </div>
    );
};

export default Orders;