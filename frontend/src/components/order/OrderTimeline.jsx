const steps = [
    "NEW",
    "CONFIRMED",
    "PREPARING",
    "SHIPPING",
    "DELIVERED"
];

const OrderTimeline = ({ status }) => {
    const currentIndex = steps.indexOf(status);

    return (
        <div>
            {steps.map((step, index) => (
                <div
                    key={step}
                    style={{
                        marginBottom: 12,
                        fontWeight:
                            index <= currentIndex
                                ? "bold"
                                : "normal"
                    }}
                >
                    {index <= currentIndex ? "✔ " : "○ "}
                    {step}
                </div>
            ))}

            {(status === "CANCELLED" ||
                status === "CANCEL_REQUESTED") && (
                <div style={{ color: "red" }}>
                    {status}
                </div>
            )}
        </div>
    );
};

export default OrderTimeline;