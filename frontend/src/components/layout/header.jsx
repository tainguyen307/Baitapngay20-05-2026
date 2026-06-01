import React, { useContext, useState, useEffect } from "react";

import {
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";

import { Dropdown, Badge } from "antd";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { AuthContext } from "../context/auth.context";

import { fetchCategoriesApi } from "../../util/api";

import { getCartAPI } from "../../util/api";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { auth, setAuth } = useContext(AuthContext);

  const [keyword, setKeyword] = useState("");

  // sync keyword from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) setKeyword(search);
  }, [location.search]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");

    setAuth({
      isAuthenticated: false,
      user: {
        email: "",
        name: "",
        role: "user",
      },
    });

    navigate("/");
  };

  // SEARCH
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      if (keyword.trim()) {
        navigate(`/products?search=${keyword}`);
      }
    }
  };

  /* PRODUCT MENU */
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetchCategoriesApi();

        setCategories(
          res?.data?.data || res?.data || []
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const productItems = categories.map((item) => ({
    key: item._id,
    label: (
      <Link to={`/products?category=${item._id}`}>
        {item.name}
      </Link>
    ),
  }));

  // Fetch Cart quantity
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCartAPI();

        const items =
          res?.data?.items || [];

        const total =
          items.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

        setCartCount(total);
      } catch (error) {
        console.log(error);
      }
    };

    if (auth.isAuthenticated) {
      fetchCart();
    }
  }, [auth.isAuthenticated]);

  /* ACCOUNT MENU */
  const accountItems = auth.isAuthenticated
    ? [
        ...(auth.user?.role === "admin"
          ? [
              {
                key: "admin",
                label: <Link to="/admin">Admin Panel</Link>,
              },
            ]
          : []),
        {
          key: "user",
          label: <Link to="/user">My Account</Link>,
        },
        {
          key: "orders",
          label: <Link to="/orders">My Orders</Link>,
        },
        {
          key: "logout",
          label: (
            <button onClick={handleLogout} className="w-full text-left">
              Đăng xuất
            </button>
          ),
        },
      ]
    : [
        {
          key: "login",
          label: <Link to="/login">Đăng nhập</Link>,
        },
        {
          key: "register",
          label: <Link to="/register">Đăng ký</Link>,
        },
      ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">

      <div className="max-w-screen-2xl mx-auto h-20 px-8 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 shrink-0">

          <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center">
            <AppstoreOutlined className="text-white text-xl" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800 leading-6">
              Pickleball
            </h1>
            <p className="text-sm text-gray-500">Sport Store</p>
          </div>

        </Link>

        {/* SEARCH */}
        <div className="flex-1 max-w-xl mx-10">
          <div className="relative">

            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Tìm kiếm sản phẩm..."
              className="
                w-full
                px-5 py-3
                pr-12
                rounded-2xl
                bg-gray-100
                focus:bg-white
                focus:ring-2
                focus:ring-green-500
                outline-none
                transition
              "
            />

            <button
              onClick={() =>
                keyword.trim() && navigate(`/products?search=${keyword}`)
              }
              className="
                absolute right-3 top-1/2 -translate-y-1/2
                text-gray-500 hover:text-green-600
              "
            >
              🔍
            </button>

          </div>
        </div>

        {/* MENU */}
        <nav className="flex items-center gap-3">

          <Link
            to="/"
            className={`
              flex items-center gap-2
              px-5 py-3 rounded-xl
              font-medium transition

              ${
                location.pathname === "/"
                  ? "bg-green-50 text-green-600"
                  : "text-gray-700 hover:bg-gray-100"
              }
            `}
          >
            <HomeOutlined className="text-lg" />
            Trang chủ
          </Link>

          <Dropdown menu={{ items: productItems }} placement="bottom" arrow>
            <button className="flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-100 transition">
              <AppstoreOutlined className="text-lg" />
              Sản phẩm
            </button>
          </Dropdown>

        </nav>

        {/* RIGHT */}
        <div className="flex items-center gap-5">

          {/* CART */}
          <Link to="/cart" className="w-12 h-12 rounded-xl bg-gray-100 hover:bg-green-50 transition flex items-center justify-center">
            <Badge count={cartCount} size="small">
              <ShoppingCartOutlined className="text-xl text-gray-700" />
            </Badge>
          </Link>

          {/* ACCOUNT */}
          <Dropdown menu={{ items: accountItems }} placement="bottomRight" arrow>
            <button className="flex items-center gap-3 px-2 py-2 rounded-2xl hover:bg-gray-100 transition">

              <div className="w-11 h-11 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">
                {auth?.user?.email
                  ? auth.user.email.charAt(0).toUpperCase()
                  : <UserOutlined />}
              </div>

              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-500">Xin chào</span>

                <span className="text-sm font-semibold text-gray-800 max-w-[140px] truncate">
                  {auth.isAuthenticated ? auth.user.email : "Tài khoản"}
                </span>
              </div>

            </button>
          </Dropdown>

        </div>

      </div>

    </header>
  );
};

export default Header;