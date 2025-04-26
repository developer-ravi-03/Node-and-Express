//external module
const express = require("express");
const authRouter = express.Router();

//local modules
const authController = require("../controller/authController");

authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);
authRouter.post("/logout", authController.postLogout);

module.exports = authRouter;
