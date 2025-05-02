const Home = require("../models/home");
const fs = require("fs");
exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home To Airbnb",
    currentPage: "Add-Home",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
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
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.getHostHome = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "Host Homes List",
      currentPage: "host-homes",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postAddHome = (req, res, next) => {
  const { home, price, Location, rating, description } = req.body;
  console.log(home, price, Location, rating, description);
  console.log(req.file);

  if (!req.file) {
    return res.status(422).send("no image");
  }

  const photo = req.file.path;

  const house = new Home({
    home,
    price,
    Location,
    rating,
    photo,
    description,
  });
  house.save().then(() => {
    console.log("Home saved Successfully");
  });
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  const { id, home, price, Location, rating, description } = req.body;

  Home.findById(id)
    .then((house) => {
      house.home = home;
      house.price = price;
      house.Location = Location;
      house.rating = rating;
      house.description = description;

      if (req.file) {
        // this is for deleting the file
        fs.unlink(house.photo, (err) => {
          if (err) {
            console.log("Error in deleting file", err);
          }
        });
        house.photo = req.file.path;
      }

      house
        .save()
        .then((result) => {
          console.log("Home saved Successfully", result);
        })
        .catch((err) => {
          console.log("Error while saving home:", err);
        });
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error while finding home:", err);
      // res.redirect("/host/host-home-list");
    });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((err) => {
      console.log("Error while deleting home:", err);
    });
};
