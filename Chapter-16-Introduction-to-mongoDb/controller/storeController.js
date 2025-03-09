const Favourite = require("../models/favorite");
const Home = require("../models/home");

exports.getIndex = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "index",
    });
  });
};

exports.getHome = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Homes List",
      currentPage: "Home",
    });
  });
};

exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "My Bookings",
    currentPage: "Bookings",
  });
};

exports.getFavoriteItem = (req, res, next) => {
  Favourite.getFavourites().then((favourites) => {
    favourites = favourites.map((fav) => fav.homeId);
    Home.fetchAll().then((registeredHomes) => {
      console.log("Favourites", favourites);
      console.log("Registered Homes", registeredHomes);

      const favouriteHomes = registeredHomes.filter((home) =>
        favourites.includes(home._id.toString())
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
  const homeId = req.body.id;
  const fav = new Favourite(homeId);
  fav
    .save()
    .then((result) => {
      console.log("Favourite Added", result);
    })
    .catch((error) => {
      console.log("Error while marking favourite: ", error);
    })
    .finally(() => {
      res.redirect("/favorites");
    });
};

//for remove from favourite
exports.postRemoveFromFavourite = (req, res, next) => {
  const homeId = req.params.homeId;
  Favourite.deleteById(homeId)
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
      });
    }
  });
};
