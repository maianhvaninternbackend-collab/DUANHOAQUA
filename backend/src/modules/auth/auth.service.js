const ApiError = require("../../core/apiError");
const authRepo = require("./auth.repo");
const httpStatus = require("../../core/httpStatus");
const { hashPassword, comparePassword } = require("../../helpers/password.auth");
const {
  generateAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../../helpers/jwt.auth");

exports.login = async ({ email, password }, type = "user") => {
  const user = await authRepo.findByEmailForLogin(email, type);
  if (!user)
    throw new ApiError(httpStatus.UNAUTHORIZED, "Sai Email hoặc mật khẩu");

  const ok = await comparePassword(password, user.passwordHash);
  if (!ok)
    throw new ApiError(httpStatus.UNAUTHORIZED, "Sai Email hoặc mật khẩu");

  return {
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: type === "admin" ? "admin" : "user",
    },
    accessToken: generateAccessToken({
      ...user.toObject(),
      role: type === "admin" ? "admin" : "user",
    }),
    refreshToken: signRefreshToken({
      ...user.toObject(),
      role: type === "admin" ? "admin" : "user",
    }),
  };
};


exports.register = async ({ fullName, email, password }, type = "user") => {
  const existing = await authRepo.findAnyByEmail(email, type);
  if (existing && !existing.isDeleted) {
    throw new ApiError(httpStatus.CONFLICT, "Email đã tồn tại");
  }

  const passwordHash = await hashPassword(password);

  const user = await authRepo.createAccount(
    {
      fullName,
      email,
      passwordHash,
      role: type === "admin" ? "admin" : "user",
    },
    type
  );

  return {
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  };
};

exports.refreshToken = async (req) => {
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Không có refresh token");
  }

  const payload = verifyRefreshToken(refreshToken);
  const user = await authRepo.findById(payload.sub);
  if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, "User không tồn tại");

  return {
    accessToken: generateAccessToken(user),
    newRefreshToken: signRefreshToken(user),
    user,
  };
};

exports.logout = async () => ({ ok: true });
