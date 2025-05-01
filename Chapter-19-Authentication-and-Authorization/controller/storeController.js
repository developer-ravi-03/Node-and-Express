const Home = require("../models/home");
const User = require("../models/user");

exports.getIndex = (req, res, next) => {
  console.log("session value ", req.session);

  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
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
      user: req.session.user,
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "Bookings",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getFavoriteItem = async (req, res, next) => {
  // Find all favourites and populate the homeId field with the corresponding Home documents
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate("favourites");

  // const favouriteHomes = favourites.map((fav) => fav.homeId);

  res.render("store/favorite-list", {
    favouriteHomes: user.favourites,
    pageTitle: "My Favourites",
    currentPage: "Favorites",
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });

  //this is another method
  // Favourite.find()
  //   .populate("homeId")
  //   .then((favourites) => {
  //     res.render("store/favorite-list", {
  //       favouriteHomes: favorites,
  //       pageTitle: "My Favourites",
  //       currentPage: "Favorites",
  //       isLoggedIn: req.isLoggedIn,
  //       user: req.session.user,
  //     });
  //   });
};

exports.postAddToFavourite = async (req, res, next) => {
  const homeId = req.body.id;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (!user.favourites.includes(homeId)) {
    user.favourites.push(homeId);
    await user.save();
  }

  res.redirect("/favorites");
};

//for remove from favourite
exports.postRemoveFromFavourite = async (req, res, next) => {
  const homeId = req.params.homeId;
  const userId = req.session.user._id;
  const user = await User.findById(userId);
  if (user.favourites.includes(homeId)) {
    user.favourites = user.favourites.filter((fav) => fav != homeId);
    await user.save();
  }
  res.redirect("/favorites");

  // Favourite.findOneAndDelete(homeId)
  //   .then((result) => {
  //     console.log("Favourite Removed", result);
  //   })
  //   .catch((error) => {
  //     console.log("Error while removing favourite: ", error);
  //   })
  //   .finally(() => {
  //     res.redirect("/favorites");
  //   });
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
        user: req.session.user,
      });
    }
  });
};
