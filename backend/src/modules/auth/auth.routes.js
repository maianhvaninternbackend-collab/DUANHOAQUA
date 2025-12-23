const router = require("express").Router();
const controller = require("./auth.controller");
const { loginLimiter, loginSlowDown } = require("../../middlewares/limited");
const schema = require("./auth.validator");
const { validate } = require("../../middlewares/validate.middleware");

// ===== USER =====
router.post(
  "/login",
  loginSlowDown,
  loginLimiter,
  validate(schema.login),
  controller.loginUser
);

router.post(
  "/register",
  loginSlowDown,
  loginLimiter,
  validate(schema.register),
  controller.registerUser
);

// ===== ADMIN =====
router.post(
  "/admin/login",
  loginSlowDown,
  loginLimiter,
  validate(schema.login),
  controller.loginAdmin
);

router.post(
  "/admin/register",
  validate(schema.register),
  controller.registerAdmin
);

router.post("/refresh-token", controller.refreshToken);
router.post("/logout", controller.logout);

module.exports = router;
