const express = require("express");
const apiRoutes = require("./routes/api.routes");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());

// base api version
app.use("/api/v1", apiRoutes);

// error handler (luôn để cuối)
app.use(errorMiddleware);

module.exports = app;
