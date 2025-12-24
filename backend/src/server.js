require("dotenv").config();
console.log("👉 process.cwd() =", process.cwd());
console.log("👉 MONGODB_URI =", process.env.MONGODB_URI);

const app = require("./app");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 8080;

connectDB();

app.listen(PORT, () => {
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`
  );
});

module.exports = app;
