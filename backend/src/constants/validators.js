/**
 * Validators constants
 * Dùng chung cho Joi validation
 */

// ================= PASSWORD REGEX =================
// Ít nhất:
// - 1 chữ hoa
// - 1 chữ thường
// - 1 số
// - 1 ký tự đặc biệt
// - tối thiểu 6 ký tự
const PASSWORD_STRONG =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

// ================= APPLY PATTERN =================
const applyPattern = (schema, pattern) => {
  return schema.pattern(pattern).messages({
    "string.pattern.base":
      "Mật khẩu phải có chữ hoa, chữ thường, số và ký tự đặc biệt",
  });
};

module.exports = {
  VALIDATORS: {
    PASSWORD_STRONG,
  },
  applyPattern,
};
