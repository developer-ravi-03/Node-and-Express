//external module
const express = require("express");
const authRouter = express.Router();

//local modules
const authController = require("../controller/authController");

authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.postLogin);

authRouter.get("/sign-up", authController.getSignUp);
authRouter.post("/sign-up", authController.postSignUp);

authRouter.post("/logout", authController.postLogout);

module.exports = authRouter;
