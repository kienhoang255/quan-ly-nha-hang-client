import React from "react";
const Home = React.lazy(() => import("../pages/Home/Home"));
const Menu = React.lazy(() => import("../pages/Menu/Menu"));
const Booking = React.lazy(() => import("../pages/Booking/Booking"));
const Login = React.lazy(() => import("../pages/Login/Login"));
const Register = React.lazy(() => import("../pages/Register/Register"));
const User = React.lazy(() => import("../pages/User/User"));

export const listPages = [
  {
    path: "/",
    component: Home,
    namePage: "Trang Chủ",
  },
  {
    path: "/menu",
    component: Menu,
    namePage: "Thực Đơn",
  },
  {
    path: "/booking",
    component: Booking,
    namePage: "Đặt Bàn",
  },
];

export const pageLoginRegister = [
  {
    path: "/login",
    component: Login,
    namePage: "Đăng nhập",
  },
  {
    path: "/register",
    component: Register,
    namePage: "Đăng ký ",
  },
];

export const listPagesProtect = [
  {
    path: "/user",
    component: User,
    namePage: "user",
  },
];
