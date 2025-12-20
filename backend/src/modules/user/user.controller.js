const asyncHandler = require("../../core/asyncHandler");
const userService = require("./user.service");

// ===== ADMIN =====
exports.getUsers = asyncHandler(async (req, res) => {
  const data = await userService.getUsers(req.query);
  res.json({ data });
});

exports.getUserDetail = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json({ data: user });
});

exports.changeStatus = asyncHandler(async (req, res) => {
  const user = await userService.changeStatus(
    req.params.id,
    req.body.isActive
  );
  res.json({ data: user, message: "Cập nhật trạng thái thành công" });
});

exports.deleteUser = asyncHandler(async (req, res) => {
  const user = await userService.deleteUser(req.params.id);
  res.json({ data: user, message: "Xoá user thành công" });
});

// ===== USER =====
exports.updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateProfile(req.user.id, req.body);
  res.json({ data: user, message: "Cập nhật thành công" });
});

exports.changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const result = await userService.changePassword(
    req.user.id,
    oldPassword,
    newPassword
  );
  res.json({ data: result, message: "Đổi mật khẩu thành công" });
});


