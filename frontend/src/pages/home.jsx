import { useEffect, useState } from "react";

import {
  ShoppingCartOutlined,
  FireOutlined,
  EyeOutlined,
} from "@ant-design/icons";

import {
  fetchProductsApi,
  fetchTopSellingApi,
  fetchTopViewedApi,
  fetchCategoriesApi
} from "../util/api";

import { Link } from "react-router-dom";

import {
  Swiper,
  SwiperSlide
} from "swiper/react";

import "swiper/css";

const HomePage = () => {

  const [products, setProducts] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [topSelling, setTopSelling] =
    useState([]);

  const [topViewed, setTopViewed] =
    useState([]);

  const [page, setPage] =
    useState(1);

  const [hasMore, setHasMore] =
    useState(true);

  const [loading, setLoading] =
    useState(false);

  const [filters, setFilters] =
    useState({
      category: "",
      sort: "",
      minPrice: "",
      maxPrice: "",
    });

  // FETCH PRODUCTS
  const fetchProducts = async (
    reset = false
  ) => {

    try {

      setLoading(true);

      const params =
        new URLSearchParams();

      params.append("page", page);

      params.append("limit", 8);

      if (filters.category) {
        params.append(
          "category",
          filters.category
        );
      }

      if (filters.sort) {
        params.append(
          "sort",
          filters.sort
        );
      }

      if (filters.minPrice) {
        params.append(
          "minPrice",
          filters.minPrice
        );
      }

      if (filters.maxPrice) {
        params.append(
          "maxPrice",
          filters.maxPrice
        );
      }

      const res =
        await fetchProductsApi(
          params.toString()
        );

      const newProducts =
        res?.data?.products || [];

      if (reset) {

        setProducts(newProducts);

      } else {

        setProducts((prev) => [
          ...prev,
          ...newProducts
        ]);
      }

      const totalPages =
        res?.data?.pagination
          ?.totalPages || 1;

      if (page >= totalPages) {

        setHasMore(false);

      } else {

        setHasMore(true);
      }

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  // FETCH CATEGORIES
  const fetchCategories =
    async () => {

      try {

        const res =
          await fetchCategoriesApi();

        setCategories(
          res?.data || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  // FETCH TOP SELLING
  const fetchTopSelling =
    async () => {

      try {

        const res =
          await fetchTopSellingApi();

        setTopSelling(
          res?.data?.products || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  // FETCH TOP VIEWED
  const fetchTopViewed =
    async () => {

      try {

        const res =
          await fetchTopViewedApi();

        setTopViewed(
          res?.data?.products || []
        );

      } catch (error) {

        console.log(error);
      }
    };

  // INITIAL
  useEffect(() => {

    fetchProducts(true);

    fetchCategories();

    fetchTopSelling();

    fetchTopViewed();

  }, []);

  // FILTER CHANGE
  useEffect(() => {

    setPage(1);

    fetchProducts(true);

  }, [filters]);

  // PAGE CHANGE
  useEffect(() => {

    if (page > 1) {
      fetchProducts();
    }

  }, [page]);

  // INFINITE SCROLL
  useEffect(() => {

    const handleScroll = () => {

      if (
        window.innerHeight +
        document.documentElement.scrollTop + 1
        >=
        document.documentElement.scrollHeight
      ) {

        if (
          hasMore &&
          !loading
        ) {

          setPage((prev) =>
            prev + 1
          );
        }
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {

      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, [hasMore, loading]);

  return (

    <div className="bg-[#f5f5f5] min-h-screen">

      {/* HERO */}
      <section className="
        max-w-screen-2xl
        mx-auto
        px-8
        pt-8
      ">

        <div className="
          bg-gradient-to-r
          from-green-600
          to-emerald-500
          rounded-3xl
          overflow-hidden
          px-8
          py-10
          flex
          flex-col
          lg:flex-row
          items-center
          justify-between
          gap-8
        ">

          <div className="max-w-xl">

            <div className="
              inline-flex
              items-center
              gap-2
              bg-white/20
              text-white
              px-4
              py-2
              rounded-full
              text-sm
              mb-5
            ">
              <FireOutlined />
              Bộ sưu tập Pickleball 2026
            </div>

            <h1 className="
              text-4xl
              lg:text-5xl
              font-bold
              text-white
              leading-tight
              mb-5
            ">
              Pickleball <br />
              Sport Collection
            </h1>

            <p className="
              text-green-50
              leading-7
              mb-7
            ">
              Vợt, giày và phụ kiện
              pickleball cao cấp dành
              cho người chơi chuyên nghiệp.
            </p>

            <button className="
              bg-white
              text-green-600
              px-6
              py-3
              rounded-xl
              font-semibold
              hover:scale-105
              transition
            ">
              Mua ngay
            </button>

          </div>

          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
            alt="hero"
            className="
              w-full
              max-w-[360px]
              h-[280px]
              object-cover
              rounded-3xl
              shadow-2xl
            "
          />

        </div>

      </section>

      {/* TOP SELLING */}
      <section className="
        max-w-screen-2xl
        mx-auto
        px-8
        mt-10
      ">

        <div className="
          flex
          items-center
          justify-between
          mb-5
        ">

          <h2 className="
            text-3xl
            font-bold
          ">
            🔥 Bán chạy nhất
          </h2>

        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={5}
        >

          {topSelling.map((item) => (

            <SwiperSlide
              key={item._id}
            >

              <Link
                to={`/products/${item._id}`}
              >

                <div className="
                  bg-white
                  rounded-2xl
                  overflow-hidden
                  border
                  hover:shadow-xl
                  transition
                ">

                  <img
                    src={item.image}
                    alt=""
                    className="
                      w-full
                      h-60
                      object-cover
                    "
                  />

                  <div className="p-4">

                    <h3 className="
                      font-bold
                      line-clamp-2
                      min-h-[56px]
                    ">
                      {item.name}
                    </h3>

                    <p className="
                      text-red-500
                      text-xl
                      font-bold
                      mt-2
                    ">
                      {item.price.toLocaleString()}đ
                    </p>

                  </div>

                </div>

              </Link>

            </SwiperSlide>

          ))}

        </Swiper>

      </section>

      {/* TOP VIEWED */}
      <section className="
        max-w-screen-2xl
        mx-auto
        px-8
        mt-14
      ">

        <div className="
          flex
          items-center
          gap-3
          mb-5
        ">

          <EyeOutlined
            className="text-2xl"
          />

          <h2 className="
            text-3xl
            font-bold
          ">
            Xem nhiều nhất
          </h2>

        </div>

        <Swiper
          spaceBetween={20}
          slidesPerView={5}
        >

          {topViewed.map((item) => (

            <SwiperSlide
              key={item._id}
            >

              <Link
                to={`/products/${item._id}`}
              >

                <div className="
                  bg-white
                  rounded-2xl
                  overflow-hidden
                  border
                  hover:shadow-xl
                  transition
                ">

                  <img
                    src={item.image}
                    alt=""
                    className="
                      w-full
                      h-60
                      object-cover
                    "
                  />

                  <div className="p-4">

                    <h3 className="
                      font-bold
                      line-clamp-2
                      min-h-[56px]
                    ">
                      {item.name}
                    </h3>

                    <p className="
                      text-red-500
                      text-xl
                      font-bold
                      mt-2
                    ">
                      {item.price.toLocaleString()}đ
                    </p>

                  </div>

                </div>

              </Link>

            </SwiperSlide>

          ))}

        </Swiper>

      </section>

      {/* PRODUCTS */}
      <section className="
        max-w-screen-2xl
        mx-auto
        px-8
        py-12
      ">

        {/* FILTER */}
        <div className="
          flex
          flex-wrap
          gap-4
          mb-8
        ">

          {/* CATEGORY */}
          <select
            className="
              px-4
              py-2
              border
              rounded-xl
            "
            value={filters.category}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                category:
                  e.target.value,
              }))
            }
          >

            <option value="">
              Tất cả
            </option>

            {categories.map((item) => (

              <option
                key={item._id}
                value={item._id}
              >
                {item.name}
              </option>

            ))}

          </select>

          {/* SORT */}
          <select
            className="
              px-4
              py-2
              border
              rounded-xl
            "
            value={filters.sort}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                sort:
                  e.target.value,
              }))
            }
          >

            <option value="">
              Sắp xếp
            </option>

            <option value="price_asc">
              Giá tăng dần
            </option>

            <option value="price_desc">
              Giá giảm dần
            </option>

            <option value="newest">
              Mới nhất
            </option>

            <option value="sold">
              Bán chạy
            </option>

            <option value="views">
              Xem nhiều
            </option>

          </select>

          {/* MIN PRICE */}
          <input
            type="number"
            placeholder="Giá từ"
            className="
              px-4
              py-2
              border
              rounded-xl
              w-32
            "
            value={filters.minPrice}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                minPrice:
                  e.target.value,
              }))
            }
          />

          {/* MAX PRICE */}
          <input
            type="number"
            placeholder="Giá đến"
            className="
              px-4
              py-2
              border
              rounded-xl
              w-32
            "
            value={filters.maxPrice}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                maxPrice:
                  e.target.value,
              }))
            }
          />

          {/* RESET */}
          <button
            onClick={() =>
              setFilters({
                category: "",
                sort: "",
                minPrice: "",
                maxPrice: "",
              })
            }
            className="
              px-4
              py-2
              bg-gray-100
              rounded-xl
              hover:bg-gray-200
            "
          >
            Reset
          </button>

        </div>

        {/* HEADER */}
        <div className="
          flex
          items-center
          justify-between
          mb-8
        ">

          <div>

            <p className="
              text-green-600
              text-sm
              font-semibold
              mb-2
            ">
              PICKLEBALL STORE
            </p>

            <h2 className="
              text-3xl
              font-bold
              text-gray-900
            ">
              Sản phẩm nổi bật
            </h2>

          </div>

        </div>

        {/* GRID */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          xl:grid-cols-4
          gap-6
        ">

          {products?.map((item) => (

            <Link
              to={`/products/${item._id}`}
              key={item._id}
            >

              <div className="
                bg-white
                rounded-2xl
                overflow-hidden
                border
                border-gray-200
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                duration-300
                group
              ">

                <div className="
                  relative
                  bg-gray-100
                  overflow-hidden
                ">

                  <img
                    src={
                      item.images?.[0]
                      || item.image
                    }
                    alt={item.name}
                    className="
                      w-full
                      h-60
                      object-cover
                      group-hover:scale-105
                      transition
                      duration-500
                    "
                  />

                  <div className="
                    absolute
                    top-3
                    left-3
                    bg-green-600
                    text-white
                    text-xs
                    font-semibold
                    px-3
                    py-1
                    rounded-full
                  ">
                    HOT
                  </div>

                </div>

                <div className="p-5">

                  <p className="
                    text-sm
                    text-green-600
                    font-medium
                    mb-2
                  ">
                    {item?.category?.name}
                  </p>

                  <h3 className="
                    text-lg
                    font-bold
                    text-gray-900
                    leading-7
                    mb-3
                    min-h-[56px]
                  ">
                    {item.name}
                  </h3>

                  <p className="
                    text-sm
                    text-gray-500
                    line-clamp-2
                    mb-5
                  ">
                    {item.description}
                  </p>

                  <div className="
                    flex
                    items-center
                    justify-between
                  ">

                    <div>

                      <p className="
                        text-xs
                        text-gray-400
                      ">
                        Giá bán
                      </p>

                      <h4 className="
                        text-2xl
                        font-bold
                        text-red-500
                      ">
                        {item.price.toLocaleString()}đ
                      </h4>

                    </div>

                    <button className="
                      w-11
                      h-11
                      rounded-xl
                      bg-green-600
                      hover:bg-green-700
                      text-white
                      flex
                      items-center
                      justify-center
                      transition
                    ">
                      <ShoppingCartOutlined />
                    </button>

                  </div>

                </div>

              </div>

            </Link>

          ))}

        </div>

        {/* LOADING */}
        {loading && (

          <div className="
            text-center
            py-10
            text-gray-500
          ">
            Loading...
          </div>

        )}

      </section>

    </div>
  );
};

export default HomePage;