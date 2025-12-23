const asyncHandler = require("../../core/asyncHandler");
const adminService = require("./admin.service");

// ===== ADMIN MANAGEMENT =====
exports.getAdmins = asyncHandler(async (req, res) => {
  const data = await adminService.getAdmins(req.query);
  res.json({ data });
});

exports.getAdminDetail = asyncHandler(async (req, res) => {
  const admin = await adminService.getAdminById(req.params.id);
  res.json({ data: admin });
});

exports.changeStatus = asyncHandler(async (req, res) => {
  const admin = await adminService.changeStatus(
    req.params.id,
    req.body.isActive
  );
  res.json({ data: admin, message: "Cập nhật trạng thái thành công" });
});

exports.deleteAdmin = asyncHandler(async (req, res) => {
  const admin = await adminService.deleteAdmin(req.params.id);
  res.json({ data: admin, message: "Xoá admin thành công" });
});

// ===== SELF =====
exports.updateProfile = asyncHandler(async (req, res) => {
  const admin = await adminService.updateProfile(req.user.id, req.body);
  res.json({ data: admin, message: "Cập nhật thành công" });
});

exports.changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const result = await adminService.changePassword(
    req.user.id,
    oldPassword,
    newPassword
  );
  res.json({ data: result, message: "Đổi mật khẩu thành công" });
});
