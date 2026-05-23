import { useState } from "react";
import {
    createOrderAPI
} from "../util/api";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate =
        useNavigate();

    const [form, setForm] =
        useState({
            fullName: "",
            phone: "",
            address: ""
        });

    const handleChange = (
        e
    ) => {
        setForm({
            ...form,
            [
                e.target.name
            ]:
                e.target.value
        });
    };

    const handleSubmit =
        async (e) => {
            e.preventDefault();

            const res =
                await createOrderAPI(
                    {
                        shippingAddress:
                            form,
                        paymentMethod:
                            "COD"
                    }
                );

            if (
                res?.data
            ) {
                navigate(
                    "/orders"
                );
            }
        };

    return (
        <div>
            <h2>
                Checkout
            </h2>

            <form
                onSubmit={
                    handleSubmit
                }
            >
                <input
                    type="text"
                    name="fullName"
                    placeholder="Full name"
                    value={
                        form.fullName
                    }
                    onChange={
                        handleChange
                    }
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={
                        form.phone
                    }
                    onChange={
                        handleChange
                    }
                />

                <textarea
                    name="address"
                    placeholder="Address"
                    value={
                        form.address
                    }
                    onChange={
                        handleChange
                    }
                />

                <p>
                    Payment:
                    COD
                </p>

                <button
                    type="submit"
                >
                    Place
                    Order
                </button>
            </form>
        </div>
    );
};

export default Checkout;