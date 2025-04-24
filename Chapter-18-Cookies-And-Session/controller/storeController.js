const Favourite = require("../models/favorite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getHome = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
      isLoggedIn: req.isLoggedIn,
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "Bookings",
    isLoggedIn: req.isLoggedIn,
  });
};

exports.getFavoriteItem = (req, res, next) => {
  // Find all favourites and populate the homeId field with the corresponding Home documents
  //this is another method
  Favourite.find()
    .populate("homeId")
    .then((favourites) => {
      const favouriteHomes = favourites.map((fav) => fav.homeId);
      console.log("Favourites", favouriteHomes);
      res.render("store/favorite-list", {
        favouriteHomes: favouriteHomes,
        pageTitle: "My Favourites",
        currentPage: "Favorites",
        isLoggedIn: req.isLoggedIn,
      });
    });
};

exports.postAddToFavourite = (req, res, next) => {
  const homeId = req.body.id;

  Favourite.findOne({ homeId: homeId })
    .then((fav) => {
      if (fav) {
        console.log("Already mark as Favourite", fav);
      } else {
        fav = new Favourite({ homeId: homeId });
        fav.save().then((result) => {
          console.log("Favourite Added", result);
        });
      }
      res.redirect("/favorites");
    })
    .catch((error) => {
      console.log("Error while adding to favourite: ", error);
    });
};

//for remove from favourite
exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.findOneAndDelete(homeId)
    .then((result) => {
      console.log("Favourite Removed", result);
    })
    .catch((error) => {
      console.log("Error while removing favourite: ", error);
    })
    .finally(() => {
      res.redirect("/favorites");
    });
};

exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("Home not found");
      res.redirect("/home");
    } else {
      console.log("Home", home);
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home Details",
        currentPage: "home-details",
        isLoggedIn: req.isLoggedIn,
      });
    }
  });
};
