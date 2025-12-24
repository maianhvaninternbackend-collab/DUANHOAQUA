import PublicLayout from "../../layouts/client/index";

// pages (public)
import HomePage from "../../../pages/public/HomePage";
import ProductDetails from "../../../pages/public/ProductDetailsPage";
import CartPage from "../../../pages/public/CartPage";
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
        path: "/details",
        element: <ProductDetails />,
      },
      { path: "cart", element: <CartPage /> },

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
