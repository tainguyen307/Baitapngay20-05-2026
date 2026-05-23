import {
    Swiper,
    SwiperSlide
} from "swiper/react";

import "swiper/css";

import ProductCard from "./ProductCard";

const ProductSlider = ({
    title,
    products
}) => {

    return (

        <div className="mt-10">

            <h2 className="
                text-2xl
                font-bold
                mb-5
            ">
                {title}
            </h2>

            <Swiper
                spaceBetween={20}
                slidesPerView={5}
            >

                {products.map((item) => (

                    <SwiperSlide
                        key={item._id}
                    >

                        <ProductCard
                            product={item}
                        />

                    </SwiperSlide>
                ))}

            </Swiper>

        </div>
    );
};

export default ProductSlider;