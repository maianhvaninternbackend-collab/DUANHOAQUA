import { Navigate } from "react-router-dom";
// import { RouterProvider } from "react-router-dom";
// import React from 'react'
// import ReactDOM from 'react-dom/client'
import PublicLayout from "../../layouts/client/index";

// pages (public)
import HomePage from "../../../pages/public/HomePage";
import LoginPage from '../../../features/login/user/login.jsx';
import RegisterPage from '../../../features/register/user/register.jsx';

import HomeAdmin from '../../../pages/admin/home/home.jsx';
import LoginAdmin from '../../../features/login/admin/login.jsx';
import RegisterAdmin from '../../../features/register/admin/register.jsx';
import AdminPage from '../../../pages/admin/adminpage/accounts.jsx';
import UserPage from '../../../pages/admin/userpage/user.jsx';
import ProductManagement from '../../../pages/admin/productmanagement/productManagement.jsx';
import CategoryManagement from '../../../pages/admin/categorymanagement/categoryManagement.jsx';
// import { AdminAuthWrapper } from '../../context/admin.auth.context.jsx';
// import { UserAuthWrapper } from '../../context/user.auth.context.jsx';
import ProtectedAdminRoute from '../guards/protectedAdminRoute.jsx';
// sau này mở rộng:
// import AboutPage from "@/pages/public/AboutPage";
// import ContactPage from "@/pages/public/ContactPage";

const publicRoutes = [
  {
    element: <PublicLayout />,
    children: [
      {
        index: true,          
        element: <HomePage />,
      },
      // ===== MỞ RỘNG SAU =====
      // {
      //   path: "about",
      //   element: <AboutPage />,
      // },
      // {
      //   path: "contact",
      //   element: <ContactPage />,
      // },
    ],
  },
   // ===== ADMIN PUBLIC =====
  {
    path: "/admin/login",
    element: <LoginAdmin />,
  },
  {
    path: "/admin/register",
    element: <RegisterAdmin />,
  },
  { path: "login", 
    element: <LoginPage /> 
  },
  { path: "register", 
    element: <RegisterPage /> 
  },

  // ===== ADMIN PRIVATE (BẮT BUỘC LOGIN) =====
  {
    path: "/admin",
    element: <ProtectedAdminRoute />, // 🔥 CHỐT CHẶN Ở ĐÂY
    children: [
      { index: true, element: <Navigate to="/admin/home" replace /> },
      { path: "home", element: <HomeAdmin /> },
      { path: "user", element: <UserPage /> },
      { path: "accounts", element: <AdminPage /> },
      { path: "product", element: <ProductManagement /> },
      { path: "category", element: <CategoryManagement /> },
    ],
  },
];

export default publicRoutes;
