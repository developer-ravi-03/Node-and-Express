//external module
const express = require("express");
const storeRouter = express.Router();

//local modules
const {
  getHome,
  getBookings,
  getIndex,
  getfavouritesItem,
  getHomeDetails,
  postAddToFavourite,
  postRemoveFromFavourite,
} = require("../controller/storeController");

storeRouter.get("/", getIndex);
storeRouter.get("/home", getHome);
storeRouter.get("/bookings", getBookings);
storeRouter.get("/favouritess", getfavouritesItem);

// storeRouter.get("/homes/:homeId", getHomeDetails);
storeRouter.get("/homes/:homeId", getHomeDetails);

storeRouter.post("/favouritess", postAddToFavourite);
storeRouter.post("/remove-favourites/:homeId", postRemoveFromFavourite);

module.exports = storeRouter;
