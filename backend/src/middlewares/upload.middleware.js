const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 10,
  },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif|webp|svg/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      file.originalname.toLowerCase().split(".").pop()
    );

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Chỉ được upload file ảnh!"));
  },
});

module.exports = upload;
