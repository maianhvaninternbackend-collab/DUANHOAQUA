import { useContext, useState, useEffect } from "react";
import { updateProfileApi, changePasswordApi } from "../../../api/user.api";
import { UserAuthContext } from "../../../app/context/user.auth.context";
import ProfileTabs from "./ProfileTabs";

const ProfilePage = () => {
  const { auth, setAuth } = useContext(UserAuthContext);
  const [tab, setTab] = useState("profile");

  const [form, setForm] = useState({
    name: auth.user?.fullName || "",
    email: auth.user?.email || "",
  });

  const [pwd, setPwd] = useState({ old: "", new: "", confirm: "" });

  useEffect(() => {
    if (auth?.user) {
      setForm({
        name: auth.user.fullName || "",
        email: auth.user.email || "",
      });
    }
  }, [auth.user]);

  const handleUpdateProfile = async () => {
    try {
      const res = await updateProfileApi({ fullName: form.name });
      const updatedUser = res.data;

      if (!updatedUser || !updatedUser._id) throw new Error("Lỗi dữ liệu");

      // Cập nhật Context
      setAuth({ isAuthenticated: true, user: updatedUser });

      // Cập nhật LocalStorage (Quan trọng để F5 không mất data)
      localStorage.setItem("user_id", updatedUser._id);
      localStorage.setItem("user_email", updatedUser.email);
      localStorage.setItem("user_fullName", updatedUser.fullName);
      localStorage.setItem("user_role", updatedUser.role || "user");
      if (updatedUser.image) {
        localStorage.setItem("user_image", JSON.stringify(updatedUser.image));
      }

      alert("Cập nhật thành công! ✨");
    } catch (err) {
      alert("Cập nhật thất bại");
    }
  };

  const handleChangePassword = async () => {
    if (pwd.new !== pwd.confirm) return alert("Mật khẩu không khớp");
    try {
      await changePasswordApi({ oldPassword: pwd.old, newPassword: pwd.new });
      alert("Đổi mật khẩu thành công, vui lòng đăng nhập lại");
      localStorage.clear();
      setAuth({ isAuthenticated: false, user: null });
      window.location.href = "/login";
    } catch (err) {
      alert(err.response?.data?.message || "Thất bại");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 font-sans">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
        Cài đặt tài khoản
      </h1>

      <ProfileTabs active={tab} onChange={setTab} />

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-8">
        {tab === "profile" && (
          <div className="space-y-5">
            <div className="grid gap-2">
              <label className="text-xs uppercase tracking-wider font-bold text-gray-400 ml-1">Họ tên</label>
              <input
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                placeholder="Nhập họ tên..."
              />
            </div>

            <div className="grid gap-2">
              <label className="text-xs uppercase tracking-wider font-bold text-gray-400 ml-1">Email (Cố định)</label>
              <input
                value={form.email}
                disabled
                className="w-full bg-gray-100 text-gray-400 border-none rounded-2xl px-5 py-3.5 cursor-not-allowed outline-none"
              />
            </div>

            <button
              onClick={handleUpdateProfile}
              className="w-full md:w-auto px-10 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95 mt-4"
            >
              Lưu thay đổi
            </button>
          </div>
        )}

        {tab === "password" && (
          <div className="space-y-5">
            {[{ id: "old", label: "Mật khẩu hiện tại" }, { id: "new", label: "Mật khẩu mới" }, { id: "confirm", label: "Xác nhận mật khẩu" }].map((f) => (
              <div key={f.id} className="grid gap-2">
                <label className="text-xs uppercase tracking-wider font-bold text-gray-400 ml-1">{f.label}</label>
                <input
                  type="password"
                  value={pwd[f.id]}
                  onChange={(e) => setPwd({ ...pwd, [f.id]: e.target.value })}
                  className="w-full bg-gray-50 border-none rounded-2xl px-5 py-3.5 focus:ring-2 focus:ring-emerald-500/20 transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            ))}
            <button
              onClick={handleChangePassword}
              disabled={!pwd.old || pwd.new !== pwd.confirm}
              className="w-full md:w-auto px-10 py-3.5 bg-gray-900 text-white rounded-2xl font-bold transition-all disabled:opacity-20 disabled:cursor-not-allowed mt-4"
            >
              Đổi mật khẩu
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;