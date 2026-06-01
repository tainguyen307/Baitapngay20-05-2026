import { useEffect, useState } from "react";

import {
    useParams,
    Link,
} from "react-router-dom";

import axios from "../util/axios.customize";

import {
    ShoppingCartOutlined,
} from "@ant-design/icons";

import {
    Swiper,
    SwiperSlide,
} from "swiper/react";

import "swiper/css";

import { addToCartAPI } from "../util/api";

const ProductDetailPage = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const [relatedProducts, setRelatedProducts] = useState([]);

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {

        const fetchDetail = async () => {

            const res = await axios.get(
                `/v1/api/products/${id}`
            );

            if (res?.EC === 0) {

                setProduct(res.data.product);

                setRelatedProducts(
                    res.data.relatedProducts
                );
            }
        };

        fetchDetail();

    }, [id]);

    if (!product) return null;

    // Add to cart
    const handleAddToCart = async () => {
        try {
            await addToCartAPI({
            productId: product._id,
            quantity,
            });

            alert("Đã thêm vào giỏ hàng");
        } catch (error) {
            console.error(error);
            alert("Thêm vào giỏ hàng thất bại");
        }
        };

    return (

        <div className="bg-[#f5f5f5] min-h-screen py-10">

            <div
                className="
                    max-w-6xl
                    mx-auto
                    px-6
                "
            >

                {/* TOP */}
                <div
                    className="
                        grid
                        grid-cols-1
                        lg:grid-cols-2
                        gap-10
                        bg-white
                        rounded-3xl
                        p-8
                    "
                >

                    {/* SWIPER */}
                    <div>

                        <Swiper
                            spaceBetween={20}
                        >

                            {product.images.map((img, index) => (

                                <SwiperSlide key={index}>

                                    <img
                                        src={img}
                                        alt=""
                                        className="
                                            w-full
                                            h-[500px]
                                            object-cover
                                            rounded-3xl
                                        "
                                    />

                                </SwiperSlide>
                            ))}

                        </Swiper>

                    </div>

                    {/* INFO */}
                    <div>

                        <p
                            className="
                                text-green-600
                                font-semibold
                                mb-3
                            "
                        >

                            {product?.category?.name}

                        </p>

                        <h1
                            className="
                                text-4xl
                                font-bold
                                text-gray-900
                                mb-5
                            "
                        >

                            {product.name}

                        </h1>

                        <h2
                            className="
                                text-3xl
                                font-black
                                text-red-500
                                mb-6
                            "
                        >

                            {product.price.toLocaleString()}đ

                        </h2>

                        <p
                            className="
                                text-gray-600
                                leading-8
                                mb-8
                            "
                        >

                            {product.description}

                        </p>

                        {/* STOCK */}
                        <div className="space-y-3 mb-8">

                            <p>

                                Tồn kho:
                                <span className="font-bold ml-2">

                                    {product.stock}

                                </span>

                            </p>

                            <p>

                                Đã bán:
                                <span className="font-bold ml-2">

                                    {product.sold}

                                </span>

                            </p>

                        </div>

                        {/* QUANTITY */}
                        <div
                            className="
                                flex
                                items-center
                                gap-4
                                mb-8
                            "
                        >

                            <button
                                onClick={() =>
                                    setQuantity(
                                        quantity > 1
                                            ? quantity - 1
                                            : 1
                                    )
                                }
                                className="
                                    w-12
                                    h-12
                                    rounded-xl
                                    border
                                "
                            >
                                -
                            </button>

                            <span className="text-2xl font-bold">

                                {quantity}

                            </span>

                            <button
                                onClick={() =>
                                    setQuantity(quantity + 1)
                                }
                                className="
                                    w-12
                                    h-12
                                    rounded-xl
                                    border
                                "
                            >
                                +
                            </button>

                        </div>

                        {/* BUTTON */}
                        <button
                            onClick={handleAddToCart}
                            className="
                                h-14
                                px-8
                                rounded-2xl
                                bg-green-600
                                hover:bg-green-700
                                text-white
                                font-semibold
                                flex
                                items-center
                                gap-3
                                transition
                            "
                        >

                            <ShoppingCartOutlined />

                            Thêm vào giỏ hàng

                        </button>

                    </div>

                </div>

                {/* RELATED */}
                <div className="mt-14">

                    <h2
                        className="
                            text-3xl
                            font-bold
                            mb-8
                        "
                    >

                        Sản phẩm tương tự

                    </h2>

                    <div
                        className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            lg:grid-cols-4
                            gap-6
                        "
                    >

                        {relatedProducts.map((item) => (

                            <Link
                                to={`/products/${item._id}`}
                                key={item._id}
                            >

                                <div
                                    className="
                                        bg-white
                                        rounded-2xl
                                        overflow-hidden
                                        hover:shadow-xl
                                        transition
                                    "
                                >

                                    <img
                                        src={item.images[0]}
                                        alt=""
                                        className="
                                            w-full
                                            h-60
                                            object-cover
                                        "
                                    />

                                    <div className="p-4">

                                        <h3
                                            className="
                                                font-bold
                                                text-lg
                                                mb-2
                                            "
                                        >

                                            {item.name}

                                        </h3>

                                        <p
                                            className="
                                                text-red-500
                                                font-bold
                                            "
                                        >

                                            {item.price.toLocaleString()}đ

                                        </p>

                                    </div>

                                </div>

                            </Link>
                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetailPage;