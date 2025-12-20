const ApiError = require("../../core/apiError");
const authRepo = require("./auth.repo");
const httpStatus = require("../../core/httpStatus");
const { hashPassword, comparePassword } = require("../../helpers/password.auth");
const {
  generateAccessToken,
  signRefreshToken,
  verifyRefreshToken,
} = require("../../helpers/jwt.auth");

exports.login = async ({ email, password }) => {
  const user = await authRepo.findByEmailForLogin(email);
  if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, "Sai Email hoặc mật khẩu");

  const ok = await comparePassword(password, user.passwordHash);
  if (!ok) throw new ApiError(httpStatus.UNAUTHORIZED, "Sai Email hoặc mật khẩu");

  return {
    user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role },
    accessToken: generateAccessToken(user),
    refreshToken: signRefreshToken(user),
  };
};

exports.register = async ({ fullName, email, password }) => {
  const existing = await authRepo.findAnyByEmail(email);
  if (existing && !existing.isDeleted) {
    throw new ApiError(httpStatus.CONFLICT, "Email đã tồn tại");
  }

  const passwordHash = await hashPassword(password);
  let user;

  if (existing && existing.isDeleted) {
    existing.fullName = fullName;
    existing.passwordHash = passwordHash;
    existing.isDeleted = false;
    existing.isActive = true;
    user = await existing.save();
  } else {
    user = await authRepo.createUser({ fullName, email, passwordHash });
  }

  return {
    user: { id: user._id, fullName: user.fullName, email: user.email, role: user.role },
    accessToken: generateAccessToken(user),
    refreshToken: signRefreshToken(user),
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
