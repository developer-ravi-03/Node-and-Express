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
  // console.log("Editing: ", editing, "HomeId: ", homeId);

  Home.findById(homeId, (home) => {
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
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id, home, price, Location, rating, photoUrl } = req.body;
  const house = new Home(home, price, Location, rating, photoUrl);
  house.id = id;
  house.save();
  res.redirect("/host/host-home-list");
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  // console.log("Deleting Home: ", homeId);
  Home.deleteById(homeId, (error) => {
    if (error) {
      console.log("Error Deleting Home: ", error);
    }
    res.redirect("/host/host-home-list");
  });
};
