const asyncHandler = require("../../core/asyncHandler");
const authService = require("./auth.service");

// ===== USER =====
exports.loginUser = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body, "user");
  res.json({ data: result });
});

exports.registerUser = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body, "user");
  res.json({ data: result });
});

// ===== ADMIN =====
exports.loginAdmin = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body, "admin");
  res.json({ data: result });
});

exports.registerAdmin = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body, "admin");
  res.json({ data: result });
});

// ===== COMMON =====
exports.refreshToken = asyncHandler(async (req, res) => {
  const { accessToken, newRefreshToken } =
    await authService.refreshToken(req);

  res.cookie("refresh_token", newRefreshToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
});

exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie("refresh_token");
  res.json({ message: "Logout thành công" });
});
