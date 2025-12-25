const User = require("../user/user.model");
const Admin = require("../admin/admin.model");

exports.findByEmailForLogin = (email, type = "user") => {
  const Model = type === "admin" ? Admin : User;
  return Model.findOne({ email, isDeleted: false })
    .select("+passwordHash");
};

exports.findAnyByEmail = (email, type = "user") => {
  const Model = type === "admin" ? Admin : User;
  return Model.findOne({ email });
};

exports.findById = (id, type = "user") => {
  const Model = type === "admin" ? Admin : User;
  return Model.findOne({ _id: id, isDeleted: false });
};

exports.createAccount = (payload, type = "user") => {
  const Model = type === "admin" ? Admin : User;
  return Model.create(payload);
};
