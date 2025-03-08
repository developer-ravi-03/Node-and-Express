//external module
const express = require("express");
const storeRouter = express.Router();

//local modules
const {
  getHome,
  getBookings,
  getIndex,
  getFavoriteItem,
  getHomeDetails,
  postAddToFavourite,
  postRemoveFromFavourite,
} = require("../controller/storeController");

storeRouter.get("/", getIndex);
storeRouter.get("/home", getHome);
storeRouter.get("/bookings", getBookings);
storeRouter.get("/Favorites", getFavoriteItem);

// storeRouter.get("/homes/:homeId", getHomeDetails);
storeRouter.get("/homes/:homeId", getHomeDetails);

storeRouter.post("/Favorites", postAddToFavourite);
storeRouter.post("/remove-favorite/:homeId", postRemoveFromFavourite);

module.exports = storeRouter;
