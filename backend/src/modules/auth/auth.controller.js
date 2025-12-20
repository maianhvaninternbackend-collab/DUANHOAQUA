const asyncHandler = require("../../core/asyncHandler");
const authService = require("./auth.service");

module.exports.login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  res.cookie("refresh_token", result.refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ data: result });
});

module.exports.register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  res.json({ data: result });
});

module.exports.refreshToken = asyncHandler(async (req, res) => {
  const { accessToken, newRefreshToken } = await authService.refreshToken(req);

  res.cookie("refresh_token", newRefreshToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ accessToken });
});

module.exports.logout = asyncHandler(async (req, res) => {
  await authService.logout(req);

  res.clearCookie("refresh_token");
  res.clearCookie("token");

  res.status(200).json({ message: "Logout thành công" });
});
