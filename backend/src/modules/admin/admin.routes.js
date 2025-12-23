const router = require("express").Router();
const ctrl = require("./admin.controller");

const auth = require("../../middlewares/auth.middleware");
const adminOnly = require("../../middlewares/admin.middleware");

// ===== ADMIN MANAGEMENT =====
router.get("/", auth, adminOnly, ctrl.getAdmins);
router.get("/:id", auth, adminOnly, ctrl.getAdminDetail);
router.patch("/:id/status", auth, adminOnly, ctrl.changeStatus);
router.delete("/:id", auth, adminOnly, ctrl.deleteAdmin);

// ===== SELF =====
router.put("/me/profile", auth, adminOnly, ctrl.updateProfile);
router.put("/me/change-password", auth, adminOnly, ctrl.changePassword);

module.exports = router;
