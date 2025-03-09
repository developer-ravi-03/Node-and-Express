const Home = require("../models/home");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home To Airbnb",
    currentPage: "Add-Home",
    editing: false,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("No Home Found");
      return res.redirect("/host/host-home-list");
    }
    // console.log("Editing: ", editing, "HomeId: ", homeId, home);
    res.render("host/edit-home", {
      home: home,
      pageTitle: "Edit your Home",
      currentPage: "host-homes",
      editing: editing,
    });
  });
};

exports.getHostHome = (req, res, next) => {
  Home.fetchAll().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { home, price, Location, rating, photoUrl, description } = req.body;
  const house = new Home(home, price, Location, rating, photoUrl, description);
  house.save().then(() => {
    console.log("Home saved Successfully");
  });
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id, home, price, Location, rating, photoUrl, description } = req.body;
  const house = new Home(
    home,
    price,
    Location,
    rating,
    photoUrl,
    description,
    id
  );
  house.save().then(() => {
    console.log("Home saved Successfully");
  });
  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.deleteById(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error while deleting home:", err);
    });
};
