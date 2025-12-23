const ApiError = require("../../core/apiError");
const httpStatus = require("../../core/httpStatus");
const adminRepo = require("./admin.repo");
const {
  hashPassword,
  comparePassword,
} = require("../../helpers/password.auth");

// ===== ADMIN MANAGEMENT =====
exports.getAdmins = async (query) => {
  const filter = { isDeleted: false };

  const options = {
    page: query.page,
    limit: query.limit,
    sort: query.sort,
  };

  const [admins, total] = await adminRepo.findAll(filter, options);

  return {
    items: admins,
    page: Number(options.page) || 1,
    limit: Number(options.limit) || 10,
    total,
    totalPages: Math.ceil(total / (options.limit || 10)),
  };
};

exports.getAdminById = async (id) => {
  const admin = await adminRepo.findById(id);
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin không tồn tại");
  }
  return admin;
};

exports.changeStatus = async (id, isActive) => {
  const admin = await adminRepo.updateById(id, { isActive });
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin không tồn tại");
  }
  return admin;
};

exports.deleteAdmin = async (id) => {
  const admin = await adminRepo.softDelete(id);
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin không tồn tại");
  }
  return admin;
};

// ===== SELF =====
exports.updateProfile = async (adminId, data) => {
  const admin = await adminRepo.updateById(adminId, data);
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin không tồn tại");
  }
  return admin;
};

exports.changePassword = async (adminId, oldPassword, newPassword) => {
  const admin = await adminRepo.findByIdWithPassword(adminId);
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin không tồn tại");
  }

  const ok = await comparePassword(oldPassword, admin.passwordHash);
  if (!ok) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Mật khẩu cũ không đúng");
  }

  const newHash = await hashPassword(newPassword);

  await adminRepo.updateById(adminId, {
    passwordHash: newHash,
  });

  await adminRepo.incrementAuthzVersion(adminId);

  return { success: true };
};
