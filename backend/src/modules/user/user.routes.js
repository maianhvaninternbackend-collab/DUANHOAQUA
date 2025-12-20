const router = require("express").Router();
const ctrl = require("./user.controlller");

const auth = require("../../middlewares/auth.middleware");
const admin = require("../../middlewares/admin.middleware");

// ===== ADMIN =====
router.get("/", auth, admin, ctrl.getUsers);
router.get("/:id", auth, admin, ctrl.getUserDetail);
router.patch("/:id/status", auth, admin, ctrl.changeStatus);
router.delete("/:id", auth, admin, ctrl.deleteUser);

// ===== USER =====
router.put("/me/profile", auth, ctrl.updateProfile);
router.put("/me/change-password", auth, ctrl.changePassword);

module.exports = router;