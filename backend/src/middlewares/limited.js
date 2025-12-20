const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 10,
  message: "Quá nhiều lần đăng nhập, thử lại sau 15 phút",
});

const loginSlowDown = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 5,
  delayMs: () => 500,
});

module.exports = {
  loginLimiter,
  loginSlowDown,
};
