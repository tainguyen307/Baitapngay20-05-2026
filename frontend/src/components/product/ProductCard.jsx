import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

    return (

        <Link
            to={`/products/${product._id}`}
            className="
                bg-white
                rounded-2xl
                overflow-hidden
                shadow-sm
                hover:shadow-lg
                duration-300
            "
        >

            <img
                src={product.image}
                alt=""
                className="
                    h-[240px]
                    w-full
                    object-cover
                "
            />

            <div className="p-4">

                <h3 className="font-semibold">

                    {product.name}

                </h3>

                <p className="mt-2 text-red-500">

                    ${product.price}

                </p>

            </div>

        </Link>
    );
};

export default ProductCard;