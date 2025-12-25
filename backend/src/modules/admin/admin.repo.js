const Admin = require("./admin.model");

// ===== QUERY =====
exports.findById = (id) =>
  Admin.findOne({ _id: id, isDeleted: false });

exports.findByIdWithPassword = (id) =>
  Admin.findOne({ _id: id, isDeleted: false }).select("+passwordHash");

exports.findAll = (filter = {}, options = {}) => {
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const skip = (page - 1) * limit;

  return Promise.all([
    Admin.find(filter)
      .sort(options.sort || "-createdAt")
      .skip(skip)
      .limit(limit),
    Admin.countDocuments(filter),
  ]);
};

// ===== COMMAND =====
exports.updateById = (id, data) =>
  Admin.findByIdAndUpdate(id, data, { new: true });

exports.incrementAuthzVersion = (id) =>
  Admin.findByIdAndUpdate(
    id,
    { $inc: { authzVersion: 1 } },
    { new: true }
  );

exports.softDelete = (id) =>
  Admin.findByIdAndUpdate(
    id,
    { isDeleted: true, isActive: false },
    { new: true }
  );

exports.updateLastLogin = (id) =>
  Admin.findByIdAndUpdate(id, { lastLoginAt: new Date() });
