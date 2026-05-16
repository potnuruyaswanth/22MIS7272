const express = require("express");

const schedulerRoutes = require("./routes/schedulerRoutes");

const app = express();

app.use(express.json());

app.use("/api", schedulerRoutes);

module.exports = app;