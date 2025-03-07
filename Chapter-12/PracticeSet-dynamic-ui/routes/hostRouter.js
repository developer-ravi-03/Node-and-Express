//core module
const path = require("path");

//external module
const express = require("express");
const hostRouter = express.Router();

//local modules
const rootdir = require("../utils/pathutils");

hostRouter.get("/add-home", (req, res, next) => {
  res.render("add-home", {
    pageTitle: "Add Home To Airbnb",
    currentPage: "add-Home",
  });
});

const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  console.log(req.body);
  registeredHomes.push(req.body);
  res.render("registered-home", {
    pageTitle: "Home Added Successfully",
    currentPage: "Home-Added",
  });
});

// module.exports = hostRouter;

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;
