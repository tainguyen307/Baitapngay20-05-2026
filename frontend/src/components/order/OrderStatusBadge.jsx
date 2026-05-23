const OrderStatusBadge = ({ status }) => {
    const map = {
        NEW: "gray",
        CONFIRMED: "blue",
        PREPARING: "orange",
        SHIPPING: "purple",
        DELIVERED: "green",
        CANCELLED: "red",
        CANCEL_REQUESTED: "brown"
    };

    return (
        <span
            style={{
                background: map[status] || "#ddd",
                color: "#fff",
                padding: "4px 10px",
                borderRadius: "6px",
                fontSize: "12px"
            }}
        >
            {status}
        </span>
    );
};

export default OrderStatusBadge;