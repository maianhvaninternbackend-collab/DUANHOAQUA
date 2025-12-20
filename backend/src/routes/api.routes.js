const router = require("express").Router();

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

/**
 * =========================
 * (TƯƠNG LAI)
 * =========================
 * router.use("/products", require("../modules/product/product.routes"));
 * router.use("/categories", require("../modules/category/category.routes"));
 * router.use("/upload", require("../modules/upload/upload.routes"));
 */

module.exports = router;
