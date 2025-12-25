import PublicLayout from "../../layouts/client/index";

// pages (public)
import HomePage from "../../../pages/public/HomePage";
import ProductDetails from "../../../pages/public/ProductDetailsPage";
import CartPage from "../../../pages/public/CartPage";
import ShopPage from "../../../pages/public/ShopPage";
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
      {
        path: "/details/:slug",
        element: <ProductDetails />,
      },
      { path: "/cart", element: <CartPage /> },
      { path: "/category", element: <ShopPage /> },

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
];

export default publicRoutes;
