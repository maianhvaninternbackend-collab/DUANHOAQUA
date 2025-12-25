const express = require("express");
const route = express.Router();
const categoryUserController = require("./controllers/category.user.controller");
const categoryAdminController = require("./controllers/category.admin.controller");
const auth = require("../../middlewares/auth.middleware");
const adminOnly = require("../../middlewares/admin.middleware");
route.get("/me/:id", categoryUserController.getCategoryDetails);
route.get("/me/", categoryUserController.getAllCategories);
route.get("/", auth, adminOnly, categoryAdminController.getAllCategories);
route.get("/:id", auth, adminOnly, categoryAdminController.getCategoryDetails);

route.post(
  "/create",
  auth,
  adminOnly,
  categoryAdminController.createNewCategory
);
route.put("/edit/:id", auth, adminOnly, categoryAdminController.updateCategory);
route.delete(
  "/delete/:id",
  auth,
  adminOnly,
  categoryAdminController.deleteCategory
);
route.patch(
  "/toggle/:id",
  auth,
  adminOnly,
  categoryAdminController.toggleCategoryActive
);

module.exports = route;
