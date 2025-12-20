const { Schema, model } = require("mongoose");

// ================= ADDRESS SUB-SCHEMA =================
const addressSchema = new Schema(
  {
    name: { type: String, trim: true },
    phone: { type: String, trim: true },
    street: { type: String, trim: true },
    ward: { type: String, trim: true },
    district: { type: String, trim: true },
    province: { type: String, trim: true },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

// ================= USER SCHEMA =================
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
      unique: true,
      sparse: true,
    },

    // 🔐 password hash
    passwordHash: {
      type: String,
      required: true,
      select: false, // ❗ không tự động trả về
    },

    /**
     * authzVersion
     * - tăng khi logout toàn bộ
     * - tăng khi đổi mật khẩu
     * - tăng khi đổi role / quyền
     */
    authzVersion: {
      type: Number,
      default: 0,
    },

    // 🖼 avatar
    image: {
      url: { type: String, trim: true, default: "" },
      publicId: { type: String, trim: true, default: "" },
    },

    // 📦 address book
    addresses: [addressSchema],

    // 🔒 status
    isActive: {
      type: Boolean,
      default: true,
    },

    // 🗑 soft delete
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
