import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { registerUserApi } from "../../../api/auth.api";
import background_login_gradient from "../../../assets/background_login_gradient.jpg"
import sub_background_login from "../../../assets/sub_background_login.jpg"
const RegisterPage = () => {
  const navigate = useNavigate();

  // ================= STATE =================
  const [formValues, setFormValues] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  // ================= HANDLERS =================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

    if (!formValues.fullName.trim()) {
      newErrors.fullName = "Please input your full name!";
    }

    if (!formValues.email) {
      newErrors.email = "Please input your email!";
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      newErrors.email = "Email is invalid!";
    }

    if (!formValues.password) {
      newErrors.password = "Please input your password!";
    } else if (!passwordRegex.test(formValues.password)) {
      newErrors.password =
        "Password must include uppercase, lowercase, number and special character!";
    }

    if (!formValues.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password!";
    } else if (formValues.confirmPassword !== formValues.password) {
      newErrors.confirmPassword = "Passwords do not match!";
    }

    return newErrors;
  };

  const getErrorMessage = (resOrErr) => {
    return (
      resOrErr?.response?.data?.details?.[0] ||
      resOrErr?.response?.data?.message ||
      resOrErr?.data?.details?.[0] ||
      resOrErr?.data?.message ||
      "Đăng ký thất bại!"
    );
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (loading) return;

  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  setLoading(true);

  try {
    // axios interceptor đã unwrap → res = response.data
    const res = await registerUserApi({
      fullName: formValues.fullName,
      email: formValues.email,
      password: formValues.password,
    });

    // ✅ THÀNH CÔNG KHI CÓ user
    if (!res?.data?.user) {
      setNotification({
        message: "Đăng ký thất bại!",
        type: "error",
      });
      return;
    }

    setNotification({
      message: "Đăng ký thành công!",
      type: "success",
    });

    setTimeout(() => navigate("/login"), 800);
  } catch (err) {
    setNotification({
      message:
        err?.details?.[0] ||
        err?.message ||
        "Đăng ký thất bại!",
      type: "error",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      className="min-h-screen p-5 flex justify-center items-center bg-cover bg-center bg-no-repeat relative font-sans"
     style={{ backgroundImage: `url(${background_login_gradient})` }}
    >
      {/* Notification */}
      {notification.message && (
        <div className={`fixed top-5 right-5 px-5 py-3.5 rounded-xl text-white z-[9999] shadow-lg animate-in slide-in-from-right duration-300 ${notification.type === "success" ? "bg-[#1dbf73]" : "bg-[#ff4d4f]"
          }`}>
          {notification.message}
        </div>
      )}

      {/* Card: Giữ nguyên size 900x550 (tăng nhẹ h để chứa confirm pass) */}
      <div className="flex w-full max-w-[800px] md:min-h-[480px] bg-white rounded-[18px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.15)] flex-col md:flex-row">

        {/* LEFT Banner */}
        <div
          className="hidden md:flex flex-1 p-12 flex-col justify-center text-white bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: `url(${sub_background_login})` }}
        >
          <h1 className="text-[32px] font-bold mb-2">Create Account</h1>
          <p className="text-[15px] opacity-90 max-w-[280px]">
            Join us and start your journey now.
          </p>
        </div>

        {/* RIGHT Form */}
        <div className="flex-1 p-8 sm:p-10 bg-white">
          <form onSubmit={handleSubmit} className="w-full">
            <h2 className="text-2xl md:text-[28px] font-semibold mb-6 text-[#333]">Register</h2>

            {/* Full Name */}
            <div className="mb-4">
              <input
                type="text"
                name="fullName"
                placeholder="Full name"
                className="w-full h-11 px-3.5 border border-[#dcdcdc] rounded-[10px] text-[15px] transition-all outline-none focus:border-[#40a9ff] focus:shadow-[0_0_0_2px_rgba(64,169,255,0.25)]"
                value={formValues.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <p className="text-[#ff4d4f] text-xs mt-1 ml-1">{errors.fullName}</p>}
            </div>

            {/* Email */}
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full h-11 px-3.5 border border-[#dcdcdc] rounded-[10px] text-[15px] transition-all outline-none focus:border-[#40a9ff] focus:shadow-[0_0_0_2px_rgba(64,169,255,0.25)]"
                value={formValues.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-[#ff4d4f] text-xs mt-1 ml-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div className="mb-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full h-11 px-3.5 border border-[#dcdcdc] rounded-[10px] text-[15px] transition-all outline-none focus:border-[#40a9ff] focus:shadow-[0_0_0_2px_rgba(64,169,255,0.25)]"
                  value={formValues.password}
                  onChange={handleChange}
                />
                <span
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[18px] cursor-pointer text-[#888] hover:text-[#444]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && <p className="text-[#ff4d4f] text-xs mt-1 ml-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  className="w-full h-11 px-3.5 border border-[#dcdcdc] rounded-[10px] text-[15px] transition-all outline-none focus:border-[#40a9ff] focus:shadow-[0_0_0_2px_rgba(64,169,255,0.25)]"
                  value={formValues.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              {errors.confirmPassword && <p className="text-[#ff4d4f] text-xs mt-1 ml-1">{errors.confirmPassword}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-3 bg-[#1dbf73] hover:bg-[#17a864] disabled:bg-gray-400 text-white rounded-lg text-base font-medium transition-all active:scale-[0.98]"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>

            <p className="mt-4 text-center text-[14px] text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#1890ff] font-medium hover:underline">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;