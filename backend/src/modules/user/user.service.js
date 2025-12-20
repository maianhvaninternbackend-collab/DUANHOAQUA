const ApiError = require("../../core/apiError");
const httpStatus = require("../../core/httpStatus");
const userRepo = require("./user.repo");
const {
    hashPassword,
    comparePassword
} = require("../../helpers/password.auth");
const {
    Query
} = require("mongoose");


// Admin
exports.getUser = async (query) => {
    const filter = {
        isDeleted: false
    };
    const options = {
        page: query.page,
        limit: query.limit,
    };
    const [users, total] = await userRepo.findAll(filter, options);

    return {
        items: users,
        page: Number(options.page) || 1,
        limit: Number(options.limit) || 10,
        total,
        totalPages: Math.ceil(total / (options.limit || 10)),
    };
};

exports.changeStatus = async (id, isActive)=>{
    const user = await userRepo.updateById(id, { isActive});
    if (!user){
        throw new ApiError(httpStatus.NOT_FOUND, "User không tồn tại");
    }
    return user;
};

exports.deleteUser = async (id) => {
    const user = await userRepo.sortDelete(id);
    if(!user) {
        throw new ApiError(httpStatus.NOT_FOUND,"User không tồn tại");
    }
    return user;
};
// ===== USER =====
exports.updateProfile = async (userId, data) => {
  const user = await userRepo.updateById(userId, data);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User không tồn tại");
  }
  return user;
};

exports.changePassword = async (userId, oldPassword, newPassword) => {
  const user = await userRepo.findByIdWithPassword(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User không tồn tại");
  }

  const ok = await comparePassword(oldPassword, user.passwordHash);
  if (!ok) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Mật khẩu cũ không đúng");
  }

  const newHash = await hashPassword(newPassword);

  await userRepo.updateById(userId, {
    passwordHash: newHash,
  });

  await userRepo.incrementAuthzVersion(userId);

  return { success: true };
};