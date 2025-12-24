const router = require("express").Router();
const ctrl = require("./admin.controller");

const auth = require("../../middlewares/auth.middleware");
const adminOnly = require("../../middlewares/admin.middleware");

// ===== ADMIN USERS (PHẢI TRƯỚC) =====
router.use(
  "/users",
  auth,
  adminOnly,
  require("../user/user.routes") // 👈 router bạn gửi trước đó
);

// ===== SELF (ADMIN) =====
router.put("/me/profile", auth, adminOnly, ctrl.updateProfile);
router.put("/me/change-password", auth, adminOnly, ctrl.changePassword);

// ===== ADMIN MANAGEMENT =====
router.get("/", auth, adminOnly, ctrl.getAdmins);

// ⚠️ PHẢI ĐỂ CUỐI
router.get("/:id", auth, adminOnly, ctrl.getAdminDetail);
router.patch("/:id/status", auth, adminOnly, ctrl.changeStatus);
router.delete("/:id", auth, adminOnly, ctrl.deleteAdmin);

module.exports = router;
