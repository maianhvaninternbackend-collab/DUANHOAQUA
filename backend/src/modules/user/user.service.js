const ApiError = require("../../core/apiError");
const httpStatus = require("../../core/httpStatus");
const userRepo = require("./user.repo");
const {
  hashPassword,
  comparePassword
} = require("../../helpers/password.auth");


// Admin
exports.getUsers = async (query) => {
  console.log("👉 QUERY:", query);
  const filter = {
    isDeleted: false
  };

  if (query.search) {
    filter.$or = [{
        fullName: {
          $regex: query.search,
          $options: "i"
        }
      },
      {
        email: {
          $regex: query.search,
          $options: "i"
        }
      },
    ];
  }

  let sort = "-createdAt";
  if (query.sort === "name_asc") sort = "fullName";
  if (query.sort === "name_desc") sort = "-fullName";
  if (query.sort === "email_asc") sort = "email";
  if (query.sort === "email_desc") sort = "-email";

  const options = {
    page: query.page,
    limit: query.limit,
    sort,
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

exports.changeStatus = async (id, isActive) => {
  const user = await userRepo.updateById(id, {
    isActive
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User không tồn tại");
  }
  return user;
};

exports.deleteUser = async (id) => {
  const user = await userRepo.sortDelete(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User không tồn tại");
  }
  return user;
};
// ===== USER =====
exports.updateProfile = async (userId, data) => {
  const { fullName, phone } = data;

  const updateData = {};

  if (fullName) updateData.fullName = fullName;
  if (phone) updateData.phone = phone;

  const user = await userRepo.updateById(userId, updateData);

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

  return {
    success: true
  };
};