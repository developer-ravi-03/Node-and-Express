//core module
const path = require("path");

//external module
const express = require("express");
const userRouter = express.Router();

//local modules
const rootdir = require("../utils/pathutils");
const { registeredHomes } = require("./hostRouter");

userRouter.get("/", (req, res, next) => {
  console.log(registeredHomes);

  res.render("home", {
    registeredHomes: registeredHomes,
    pageTitle: "airbnb Home",
    currentPage: "Home",
  });
});

module.exports = userRouter;
