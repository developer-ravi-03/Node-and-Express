//core module
const path = require("path");

//external module
const express = require("express");

const contactRoutes = express.Router();

//local modules
const rootDir = require("../utils/pathutils");

contactRoutes.get("/contact-us", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "contact.html"));
});

contactRoutes.post("/contact-us", (req, res, next) => {
  console.log(req.body);

  res.sendFile(path.join(rootDir, "views", "registered.html"));
});

module.exports = contactRoutes;
