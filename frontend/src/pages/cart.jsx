import { useEffect, useState } from "react";
import {
    getCartAPI,
    updateCartAPI,
    deleteCartAPI
} from "../util/api";
import { Link } from "react-router-dom";

const Cart = () => {
    const [items, setItems] = useState([]);

    const fetchCart = async () => {
        const res = await getCartAPI();
        setItems(res?.data?.items || []);
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const updateQty = async (
        productId,
        quantity
    ) => {
        await updateCartAPI(
            productId,
            quantity
        );
        fetchCart();
    };

    const removeItem = async (
        productId
    ) => {
        await removeCartItemAPI(
            productId
        );
        fetchCart();
    };

    const subtotal = items.reduce(
        (sum, item) =>
            sum +
            item.price *
                item.quantity,
        0
    );

    return (
        <div>
            <h2>Cart</h2>

            {items.map((item) => (
                <div
                    key={
                        item.productId
                    }
                >
                    <p>
                        {item.name}
                    </p>
                    <p>
                        $
                        {item.price}
                    </p>

                    <button
                        onClick={() =>
                            updateQty(
                                item.productId,
                                item.quantity -
                                    1
                            )
                        }
                    >
                        -
                    </button>

                    <span>
                        {
                            item.quantity
                        }
                    </span>

                    <button
                        onClick={() =>
                            updateQty(
                                item.productId,
                                item.quantity +
                                    1
                            )
                        }
                    >
                        +
                    </button>

                    <button
                        onClick={() =>
                            removeItem(
                                item.productId
                            )
                        }
                    >
                        Remove
                    </button>
                </div>
            ))}

            <h3>
                Subtotal: $
                {subtotal}
            </h3>

            <Link to="/checkout">
                Checkout
            </Link>
        </div>
    );
};

export default Cart;