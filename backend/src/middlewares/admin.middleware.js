const ApiError = require("../core/apiError");
const httpStatus = require("../core/httpStatus");

module.exports = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return next(
      new ApiError(httpStatus.FORBIDDEN, "Không có quyền truy cập")
    );
  }
  next();
};

