import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { loginUserApi } from "../../../api/auth.api";
import { UserAuthContext } from "../../../app/context/user.auth.context";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(UserAuthContext);

  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUserApi({
        email: formValues.email,
        password: formValues.password,
      });

      const { accessToken, user } = res.data || {};

      if (!accessToken || !user) {
        setNotification({
          message: "Email hoặc mật khẩu không đúng",
          type: "error",
        });

        setTimeout(() => {
          setNotification({ message: "", type: "" });
        }, 800);

        return;
      }

      setNotification({ message: "Đăng nhập thành công!", type: "success" });
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      setAuth({ isAuthenticated: true, user });

      setTimeout(() => {
        navigate("/", { replace: true });
      }, 800);
    } catch (err) {
      setNotification({ message: "Server error!", type: "error" });
    }
  };

  return (
    <div
      className="min-h-screen p-5 flex justify-center items-center bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/src/assets/hinh-anh-gai-xinh-cuoi-dep-06-1.jpg')" }}
    >
      {/* Notification */}
      {notification.message && (
        <div className={`fixed top-5 right-5 px-5 py-3.5 rounded-xl text-white z-[9999] shadow-lg animate-in fade-out slide-in-from-right duration-300 ${notification.type === "success" ? "bg-[#1dbf73]" : "bg-[#ff4d4f]"
          }`}>
          {notification.message}
        </div>
      )}

      {/* Card: Giữ nguyên size 900x480 trên Desktop, tự co trên Mobile */}
      <div className="flex w-full max-w-[900px] md:h-[480px] bg-white rounded-[18px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.15)] flex-col md:flex-row">

        {/* LEFT banner: Giữ nguyên style ảnh nền bên trong */}
        <div
          className="hidden md:flex flex-1 p-[60px_50px] flex-col justify-center text-white bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: "url('/src/assets/images.jpg')" }}
        >
          <h1 className="text-[32px] font-bold mb-[10px]">Welcome back!</h1>
          <p className="text-[15px] opacity-90 max-w-[280px]">
            You can sign in to access with your existing account.
          </p>
        </div>

        {/* RIGHT form */}
        <div className="flex-1 p-8 sm:p-[50px_55px] bg-white">
          <form className="w-full" onSubmit={handleSubmit}>
            <h2 className="text-[28px] font-semibold mb-7 text-[#333]">Sign In</h2>

            {/* Email */}
            <div className="mb-5">
              <input
                type="email"
                name="email"
                placeholder="Username or email"
                className="w-full h-12 px-3.5 border border-[#dcdcdc] rounded-[10px] text-[15px] transition-all outline-none focus:border-[#40a9ff] focus:shadow-[0_0_0_2px_rgba(64,169,255,0.25)]"
                value={formValues.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="mb-5">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="w-full h-12 px-3.5 border border-[#dcdcdc] rounded-[10px] text-[15px] transition-all outline-none focus:border-[#40a9ff] focus:shadow-[0_0_0_2px_rgba(64,169,255,0.25)]"
                  value={formValues.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[18px] cursor-pointer text-[#888] hover:text-[#444]"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <div className="flex justify-between mb-5 text-[14px]">
              <label className="flex items-center gap-1 cursor-pointer">
                <input type="checkbox" className="accent-[#1890ff]" />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-[#1890ff] hover:underline">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-[#1dbf73] hover:bg-[#17a864] text-white rounded-lg text-base font-medium transition-all active:scale-[0.98]"
            >
              Sign In
            </button>

            <p className="mt-4 text-center text-[14px]">
              New here? <a href="/register" className="text-[#1890ff] font-medium hover:underline">Create an Account</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;