import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { fetchProductsApi } from "../util/api";
import { getImageUrl } from "../util/getImageUrl";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();

  // 👉 ADD
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const search =
        searchParams.get("search") || "";

      const category =
        searchParams.get("category") || "";

      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (category) params.append("category", category);

      // 👉 ADD PAGINATION
      params.append("page", page);
      params.append("limit", 12);

      const res = await fetchProductsApi(
        params.toString()
      );

      const data = res?.data?.data || res?.data;

      setProducts(data?.products || []);
      setPagination(data?.pagination || {});
    };

    fetchData();
  }, [searchParams, page]);

  // reset page khi filter đổi
  useEffect(() => {
    setPage(1);
  }, [searchParams]);

  return (
    <div className="bg-[#f5f5f5] min-h-screen">
      <section className="max-w-screen-2xl mx-auto px-8 py-10">

        <h1 className="text-4xl font-bold mb-8">
          Sản phẩm
        </h1>

        {/* PRODUCTS GRID */}
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          xl:grid-cols-4
          gap-6
        ">
          {products.map((item) => (
            <Link
              key={item._id}
              to={`/products/${item._id}`}
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

                <img
                  src={
                    getImageUrl(item.images?.[0])
                  }
                  className="w-full h-60 object-cover"
                />

                <div className="p-5">
                  <p className="text-green-600 text-sm mb-2">
                    {item.category?.name}
                  </p>

                  <h3 className="font-bold text-lg mb-3">
                    {item.name}
                  </h3>

                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex justify-between items-center">
                    <h4 className="text-red-500 text-2xl font-bold">
                      {item.price.toLocaleString()}đ
                    </h4>

                    <button className="
                      w-11 h-11
                      rounded-xl
                      bg-green-600
                      text-white
                      flex
                      items-center
                      justify-center
                    ">
                      <ShoppingCartOutlined />
                    </button>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

        {/* ================= PAGINATION UI ================= */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">

            {/* Prev */}
            <button
              disabled={page <= 1}
              onClick={() => setPage(prev => prev - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              ← Trước
            </button>

            {/* Pages */}
            {Array.from(
              { length: pagination.totalPages || 1 },
              (_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 border rounded ${
                    page === i + 1
                      ? "bg-green-600 text-white"
                      : ""
                  }`}
                >
                  {i + 1}
                </button>
              )
            )}

            {/* Next */}
            <button
              disabled={page >= pagination.totalPages}
              onClick={() => setPage(prev => prev + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Sau →
            </button>

          </div>
        )}

      </section>
    </div>
  );
};

export default Products;