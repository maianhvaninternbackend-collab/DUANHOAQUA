const User = require("../user/user.model");

exports.findByEmailForLogin = (email) => {
  return User.findOne({ email, isDeleted: false })
    .select("+passwordHash");
};

exports.findAnyByEmail = (email) =>
  User.findOne({ email });

exports.findById = (id) =>
  User.findOne({ _id: id, isDeleted: false });

exports.createUser = (payload) =>
  User.create(payload);
