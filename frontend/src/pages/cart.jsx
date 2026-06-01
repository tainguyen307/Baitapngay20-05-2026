import { useEffect, useState } from "react";
import {
  getCartAPI,
  updateCartAPI,
  deleteCartAPI,
} from "../util/api";

import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

const Cart = () => {
  const [items, setItems] = useState([]);

  const fetchCart = async () => {
    
    try {
      const res = await getCartAPI();

      setItems(
        res?.data?.items || []
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (
    product,
    quantity
  ) => {
    if (quantity < 1) return;

    await updateCartAPI(
      product,
      quantity
    );

    fetchCart();
  };

  const removeItem = async (
    product
  ) => {
    await deleteCartAPI(
      product
    );

    fetchCart();
  };

  const subtotal = items.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-10">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-8">
          🛒 Giỏ hàng
        </h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center">

            <h2 className="text-2xl font-bold mb-3">
              Giỏ hàng đang trống
            </h2>

            <p className="text-gray-500 mb-6">
              Hãy thêm sản phẩm để tiếp tục mua sắm.
            </p>

            <Link
              to="/products"
              className="
                inline-flex
                px-6
                py-3
                bg-green-600
                text-white
                rounded-xl
              "
            >
              Tiếp tục mua sắm
            </Link>

          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">

            {/* LEFT */}
            <div className="lg:col-span-2 space-y-5">

              {items.map((item) => (
                <div
                  key={item.product}
                  className="
                    bg-white
                    rounded-3xl
                    p-5
                    flex
                    gap-5
                    shadow-sm
                  "
                >

                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/200"
                    }
                    alt=""
                    className="
                      w-32
                      h-32
                      rounded-2xl
                      object-cover
                    "
                  />

                  <div className="flex-1">

                    <h3 className="text-xl font-bold">
                      {item.name}
                    </h3>

                    <p className="text-red-500 text-2xl font-bold mt-2">
                      $
                      {item.price}
                    </p>

                    <div className="flex items-center justify-between mt-6">

                      <div className="flex items-center gap-3">

                        <button
                          onClick={() =>
                            updateQty(
                              item.product,
                              item.quantity - 1
                            )
                          }
                          className="
                            w-10
                            h-10
                            rounded-xl
                            border
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <MinusOutlined />
                        </button>

                        <span className="font-bold text-lg">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            updateQty(
                              item.product,
                              item.quantity + 1
                            )
                          }
                          className="
                            w-10
                            h-10
                            rounded-xl
                            border
                            flex
                            items-center
                            justify-center
                          "
                        >
                          <PlusOutlined />
                        </button>

                      </div>

                      <button
                        onClick={() =>
                          removeItem(
                            item.product
                          )
                        }
                        className="
                          text-red-500
                          hover:text-red-700
                          text-lg
                        "
                      >
                        <DeleteOutlined />
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>

            {/* RIGHT */}
            <div>

              <div
                className="
                  bg-white
                  rounded-3xl
                  p-6
                  sticky
                  top-24
                "
              >

                <h2 className="text-2xl font-bold mb-6">
                  Tóm tắt đơn hàng
                </h2>

                <div className="space-y-4">

                  <div className="flex justify-between">
                    <span>Tạm tính</span>
                    <span>
                      ${subtotal}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Phí vận chuyển</span>
                    <span>$5</span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-2xl font-bold">

                    <span>Tổng cộng</span>

                    <span className="text-green-600">
                      $
                      {subtotal + 5}
                    </span>

                  </div>

                </div>

                <Link
                  to="/checkout"
                  className="
                    mt-8
                    h-14
                    rounded-2xl
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    font-bold
                    flex
                    items-center
                    justify-center
                    transition
                  "
                >
                  Thanh toán
                </Link>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default Cart;