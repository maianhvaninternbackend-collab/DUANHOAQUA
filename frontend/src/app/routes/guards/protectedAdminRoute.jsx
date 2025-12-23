import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AdminAuthContext } from "../../context/admin.auth.context";
import HeaderAdmin from "../../layouts/admin/Header/header";
import AdminFilterBar from "../../layouts/admin/Topbar/adminFilterBar";
import "./protectedAdminRoute.css";

const ProtectedAdminRoute = () => {
  const { auth } = useContext(AdminAuthContext);

  if (!auth?.isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div id="admin-layout">
      {/* SIDEBAR */}
      <HeaderAdmin />

      {/* MAIN AREA */}
      <div className="admin-main">
        {/* TOP BAR / FILTER BAR */}
        <AdminFilterBar />

        {/* PAGE CONTENT */}
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedAdminRoute;
