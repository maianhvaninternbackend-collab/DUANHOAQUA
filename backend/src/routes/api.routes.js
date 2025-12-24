const router = require("express").Router();

/**
 * =========================
 * HEALTH CHECK
 * =========================
 * GET /api/v1/health
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: Date.now(),
  });
});
/**
 * =========================
 * AUTH
 * =========================
 * /api/v1/auth/login
 * /api/v1/auth/register
 * /api/v1/auth/refresh-token
 * /api/v1/auth/logout
 */
router.use("/auth", require("../modules/auth/auth.routes"));

/**
 * =========================
 * USER
 * =========================
 * /api/v1/users
 * /api/v1/users/:id
 * /api/v1/users/me/profile
 * /api/v1/users/me/change-password
 */
router.use("/users", require("../modules/user/user.routes"));
router.use("/categories", require("../modules/category/category.routes"));
/**
 * =========================
 * (TƯƠNG LAI)
 * =========================
 * router.use("/products", require("../modules/product/product.routes"));
 * router.use("/categories", require("../modules/category/category.routes"));
 * router.use("/upload", require("../modules/upload/upload.routes"));
 */

module.exports = router;
