import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaUser, FaLock } from "react-icons/fa";

import { loginAdminApi } from "../../../api/auth.api";
import { AdminAuthContext } from "../../../app/context/admin.auth.context";

import "./login.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AdminAuthContext);

  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formValues.email) newErrors.email = "Email required";
    if (!formValues.password) newErrors.password = "Password required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setErrors({});

  try {
    const res = await loginAdminApi(formValues.email, formValues.password);

    // axios interceptor đã unwrap => res = response.data
    const { user, accessToken } = res.data;

    if (!user || user.role !== "admin") {
      setNotification({
        message: "Không phải tài khoản admin",
        type: "error",
      });
      return;
    }

    // ✅ Lưu admin token
    localStorage.setItem("admin_access_token", accessToken);
    localStorage.setItem("admin_email", user.email || "");
    localStorage.setItem("admin_name", user.fullName || "");
    localStorage.setItem("admin_role", user.role || "admin");

    setAuth({
      isAuthenticated: true,
      admin: {
        email: user.email,
        name: user.fullName,
        role: user.role,
      },
    });

    setNotification({
      message: "Đăng nhập thành công!",
      type: "success",
    });

    setTimeout(() => navigate("/admin/home"), 800);

  } catch (error) {
    console.log("ADMIN LOGIN ERROR:", error);
    setNotification({
      message: error?.message || "Server error!",
      type: "error",
    });
  }
};

  return (
    <div className="admin-login-container">
      {notification.message && (
        <div className={`admin-toast ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="admin-login-card">
        <div className="admin-icon-box">
          <div className="admin-circle">
            <FaUser size={40} />
          </div>
        </div>

        <form className="admin-login-form" onSubmit={handleSubmit}>
          <div className="admin-input">
            <FaUser className="admin-input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Admin email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className="admin-error">{errors.email}</p>}

          <div className="admin-input">
            <FaLock className="admin-input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          {errors.password && <p className="admin-error">{errors.password}</p>}

          <button type="submit" className="admin-login-btn">
            LOGIN
          </button>

          <p className="admin-create-link">
            New here? <a href="/admin/register">Create an Account</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
