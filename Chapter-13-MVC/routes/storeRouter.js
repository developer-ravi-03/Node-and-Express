//external module
const express = require("express");
const storeRouter = express.Router();

//local modules
const {
  getHome,
  getBookings,
  getIndex,
  getFavoriteItem,
} = require("../controller/storeController");

storeRouter.get("/", getIndex);
storeRouter.get("/home", getHome);
storeRouter.get("/bookings", getBookings);
storeRouter.get("/Favorites", getFavoriteItem);

module.exports = storeRouter;
