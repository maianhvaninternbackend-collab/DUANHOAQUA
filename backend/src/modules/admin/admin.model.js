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

// ================= ADMIN SCHEMA =================
const adminSchema = new Schema(
  {
    fullName: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      required: true,
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
      select: false,
    },

    /**
     * role
     * - admin
     * - super_admin (mở rộng sau)
     */
   role: {
  type: String,
  default: "admin",
  immutable: true, // ❗ không cho sửa
},

    /**
     * authzVersion
     * - tăng khi logout all
     * - tăng khi đổi mật khẩu
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

    // 🛡 audit
    lastLoginAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = model("Admin", adminSchema);
