// Core Modules
const fs = require("fs");
const path = require("path");
const rootDir = require("../utils/pathutils");

const favouriteDataPath = path.join(rootDir, "data", "favourite.json");

module.exports = class Favourite {
  static addToFavourite(homeId, callback) {
    Favourite.getFavourites((favourites) => {
      if (favourites.includes(homeId)) {
        callback("Home is already marked favourite");
      } else {
        favourites.push(homeId);
        fs.writeFile(favouriteDataPath, JSON.stringify(favourites), callback);
      }
    });
  }

  static getFavourites(callback) {
    fs.readFile(favouriteDataPath, "utf8", (err, data) => {
      try {
        const favorites = data.trim() ? JSON.parse(data) : [];
        callback(favorites);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        callback([]);
      }
    });
  }

  static deleteById(delHomeId, callback) {
    Favourite.getFavourites((homeIds) => {
      homeIds = homeIds.filter((homeId) => delHomeId !== homeId);
      fs.writeFile(favouriteDataPath, JSON.stringify(homeIds), callback);
    });
  }
};
