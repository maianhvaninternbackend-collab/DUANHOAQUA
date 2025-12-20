const ApiError = require("../core/apiError");
const httpStatus = require("../core/httpStatus");
const { verifyAccessToken } = require("../helpers/jwt.auth");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(
      new ApiError(httpStatus.UNAUTHORIZED, "Thiếu access token")
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = verifyAccessToken(token);
    req.user = {
      id: payload.sub,
      role: payload.role,
      authzVersion: payload.authzVersion,
    };
    next();
  } catch (err) {
    return next(
      new ApiError(httpStatus.UNAUTHORIZED, "Token không hợp lệ")
    );
  }
};
