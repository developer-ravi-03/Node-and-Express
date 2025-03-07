// External Module
const express = require("express");
const hostRouter = express.Router();

//local modules
// const { getAddHome } = require("../controller/homes");
const hostController = require("../controller/hostController");

hostRouter.get("/host/add-home", hostController.getAddHome);
hostRouter.post("/host/add-home", hostController.postAddHome);
hostRouter.get("/host/host-home-list", hostController.getHostHome);

module.exports = hostRouter;
