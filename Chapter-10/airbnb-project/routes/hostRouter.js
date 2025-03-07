//core module
const path = require("path");

//external module
const express = require("express");
const hostRouter = express.Router();

//local modules
const rootdir = require("../utils/pathutils");

hostRouter.get("/add-home", (req, res, next) => {
  res.sendFile(path.join(rootdir, "views", "add-home.html"));
});

hostRouter.post("/add-home", (req, res, next) => {
  console.log(req.body);
  res.sendFile(path.join(rootdir, "views/registered-home.html"));
});

module.exports = hostRouter;
