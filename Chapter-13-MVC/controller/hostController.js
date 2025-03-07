const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/add-home", {
    pageTitle: "Add Home To Airbnb",
    currentPage: "Add-Home",
  });
};

exports.getHostHome = (req, res, next) => {
  Home.fetchAll((registeredHomes) =>
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    })
  );
};

exports.postAddHome = (req, res, next) => {
  const { home, price, Location, rating, photoUrl } = req.body;
  const house = new Home(home, price, Location, rating, photoUrl);
  house.save();
  res.render("host/registered-home", {
    pageTitle: "Home Added Successfully",
    currentPage: "Home-Added",
  });
};
