import { useState } from "react";
import { createOrderAPI } from "../util/api";
import { useNavigate, useLocation } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const items = location.state?.items || [];

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.price || 0);
    const qty = Number(item.quantity || 0);
    return sum + price * qty;
  }, 0);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await createOrderAPI({
        shippingAddress: form,
        paymentMethod: "COD",
      });

      if (res?.data) {
        alert("Đặt hàng thành công");
        navigate("/orders");
      }
    } catch (error) {
      console.log(error);
      alert("Đặt hàng thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6">

        <h1 className="text-4xl font-bold mb-8">
          Thanh toán
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* FORM */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm">

            <h2 className="text-2xl font-bold mb-6">
              Thông tin giao hàng
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label className="block mb-2 font-medium">
                  Họ và tên
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  className="
                    w-full
                    border
                    rounded-2xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-green-500
                  "
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Số điện thoại
                </label>

                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="0901234567"
                  className="
                    w-full
                    border
                    rounded-2xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-green-500
                  "
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Địa chỉ
                </label>

                <textarea
                  rows={4}
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Nhập địa chỉ giao hàng..."
                  className="
                    w-full
                    border
                    rounded-2xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-green-500
                  "
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  h-14
                  rounded-2xl
                  bg-green-600
                  hover:bg-green-700
                  text-white
                  font-bold
                  text-lg
                  transition
                "
              >
                {loading
                  ? "Đang xử lý..."
                  : "Đặt hàng"}
              </button>
            </form>

          </div>

          {/* SUMMARY */}
          <div className="bg-white rounded-3xl p-8 shadow-sm h-fit">

            <h2 className="text-2xl font-bold mb-6">
              Tóm tắt đơn hàng
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Tạm tính</span>
                <span>{subtotal.toLocaleString()}đ</span>
              </div>

              <div className="flex justify-between">
                <span>Phí vận chuyển</span>
                <span>5000đ</span>
              </div>

              <hr />

              <div className="flex justify-between text-xl font-bold">
                <span>Tổng cộng</span>
                <span className="text-red-500">
                  {(subtotal + 5000).toLocaleString()}đ
                </span>
              </div>

            </div>

            <div className="mt-8">

              <h3 className="font-semibold mb-3">
                Phương thức thanh toán
              </h3>

              <div className="
                border
                rounded-2xl
                p-4
                bg-green-50
                border-green-200
              ">
                Thanh toán khi nhận hàng (COD)
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Checkout;