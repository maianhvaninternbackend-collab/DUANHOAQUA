import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App.jsx";
import "./index.css";

import ScrollToTop from "./features/product/hooks/ScrollToTop.jsx";
import { store } from "./app/store/store.js";

import { AdminAuthWrapper } from "./app/context/admin.auth.context.jsx";
import { UserAuthWrapper } from "./app/context/user.auth.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <UserAuthWrapper>
        <AdminAuthWrapper>
          <BrowserRouter>
            <ScrollToTop />
            <App />
          </BrowserRouter>
        </AdminAuthWrapper>
      </UserAuthWrapper>
    </Provider>
  </StrictMode>
);
