const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const apiRoutes = require("./routes/api.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const configViewEngine = require("./config/viewEngine");

const app = express();

// middleware
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// view engine (OPTIONAL)
configViewEngine(app);

// routes
app.use("/api/v1", apiRoutes);

// error handler
app.use(errorMiddleware);

module.exports = app;
