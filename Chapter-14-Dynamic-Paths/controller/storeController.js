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
  Home.fetchAll((registeredHomes) =>
    res.render("store/favorite-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Favorite items",
      currentPage: "Favorites",
    })
  );
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

// exports.getHomeDetails = (req, res, next) => {
//   const homeId = req.params.homeId;
//   console.log("Received homeId:", homeId);  // Debugging log

//   Home.findById(homeId, (home) => {
//     console.log("Home found:", home);

//     if (!home) {
//       return res.status(404).send("Home not found");
//     }

//     res.render("store/home-detail", {
//       home: home,
//       pageTitle: "Home Details",
//       currentPage: "home-details",
//     });
//   });
// };
