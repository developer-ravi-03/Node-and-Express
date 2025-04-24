//external module
const express = require("express");
const authRouter = express.Router();

//local modules
const authController = require("../controller/authController");

authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);

module.exports = authRouter;
