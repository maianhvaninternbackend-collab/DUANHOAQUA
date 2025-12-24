const ApiError = require("../core/apiError");
const httpStatus = require("../core/httpStatus");

/**
 * Global error handler
 */
module.exports = (err, req, res, next) => {
  console.error("❌ ERROR:", err);

  // ApiError (chủ động throw)
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      message: err.message,
      details: err.details || null,
      code: err.code || null,
    });
  }

  // Joi validation error (fallback)
  if (err.isJoi) {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({
      message: "Dữ liệu không hợp lệ",
      details: err.details.map((d) => d.message),
    });
  }

  // Unknown error
  return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
    message: "Internal Server Error",
  });
};
