import React from "react";
import ReactDOM from "react-dom/client";
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { AdminAuthWrapper } from "./app/context/admin.auth.context.jsx";
import { UserAuthWrapper } from "./app/context/user.auth.context.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserAuthWrapper>
      <AdminAuthWrapper>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AdminAuthWrapper>
    </UserAuthWrapper>
  </React.StrictMode>
);