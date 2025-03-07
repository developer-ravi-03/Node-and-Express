const express = require("express");
const homeRoutes = express.Router();

//local modules
const path = require("path");
const rootDir = require("../utils/pathutils");

homeRoutes.get("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "home.html"));
});

module.exports = homeRoutes;
