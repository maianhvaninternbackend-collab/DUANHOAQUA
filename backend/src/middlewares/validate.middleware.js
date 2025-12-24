const ApiError = require("../core/apiError");
const httpStatus = require("../core/httpStatus");

/**
 * Validate request body bằng Joi schema
 * @param {import("joi").Schema} schema
 */
const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,   // trả về tất cả lỗi
      allowUnknown: false,
      stripUnknown: true, // loại bỏ field dư
    });

    if (error) {
      const details = error.details.map((d) => d.message);
      return next(
        new ApiError(httpStatus.UNPROCESSABLE_ENTITY, "Dữ liệu không hợp lệ", details)
      );
    }

    req.body = value;
    next();
  };
};

module.exports = {
  validate, // ❗ BẮT BUỘC export như này
};
