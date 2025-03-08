const Favourite = require("../models/favorite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    })
  );
};

exports.getHome = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    })
  );
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "Bookings",
  });
};

exports.getFavoriteItem = (req, res, next) => {
  Favourite.getFavourites((favourites) => {
    Home.fetchAll((registeredHomes) => {
      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home.id)
      );
      res.render("store/favorite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "Favorites",
      });
    });
  });
};

exports.postAddToFavourite = (req, res, next) => {
  console.log("At postAddToFavourite", req.body.id);

  Favourite.addToFavourite(req.body.id, (error) => {
    if (error) {
      console.log("Error while marking favourite: ", error);
    }
    res.redirect("/favorites");
  });
};

//for remove from favourite
exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  // console.log("At postRemoveFromFavourite", homeId);
  Favourite.deleteById(homeId, (error) => {
    if (error) {
      console.log("Error while removing from Favourite", error);
    }
    res.redirect("/favorites");
  });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  console.log("At home details", homeId);
  Home.findById(homeId, (home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/home");
    } else {
      console.log("Home", home);
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "home-details",
      });
    }
  });
};
