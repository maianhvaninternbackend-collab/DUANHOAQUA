const express = require("express");
const route = express.Router();
const upload = require("../../middlewares/upload.middleware");
const productUsercontroller = require("./controllers/product.user.controller");
const productAdmincontroller = require("./controllers/product.admin.controller");
const auth = require("../../middlewares/auth.middleware");
const adminOnly = require("../../middlewares/admin.middleware");
route.get("/me/:id", productUsercontroller.getProductById);
route.get("/me/", productUsercontroller.getAllProducts);
route.get("/me/cat/:id", productUsercontroller.getProductByCategory);

route.get("/",auth,adminOnly, productAdmincontroller.getAllProducts);
route.get("/:id",auth,adminOnly, productAdmincontroller.getProductById);
route.post("/create",auth,adminOnly, upload.array("images", 10), productAdmincontroller.createProduct);
route.put("/edit/:id",auth,adminOnly, upload.array("images", 10), productAdmincontroller.updateProduct);
route.delete("/delete/:id",auth,adminOnly, productAdmincontroller.deleteProduct);
route.patch("/toggle/:id",auth,adminOnly, productAdmincontroller.toggleProductActive);
module.exports = route;
