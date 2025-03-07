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
  });
});

const registeredHomes = [];

hostRouter.post("/add-home", (req, res, next) => {
  console.log(req.body.username);
  registeredHomes.push({ houseName: req.body.username });
  res.render("registered-home", {
    pageTitle: "Home Added Successfully",
  });
});

// module.exports = hostRouter;

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;
