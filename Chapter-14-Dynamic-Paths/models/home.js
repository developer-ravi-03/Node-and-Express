//core modules
const fs = require("fs");
const path = require("path");
const rootdir = require("../utils/pathutils");
const Favourite = require("./favorite");
const homeDataPath = path.join(rootdir, "data", "homes.json");

//fake database
let registeredHomes = [];

module.exports = class Home {
  constructor(home, price, Location, rating, photoUrl) {
    this.home = home;
    this.price = price;
    this.Location = Location;
    this.rating = rating;
    this.photoUrl = photoUrl;
  }

  save() {
    Home.fetchAll((registeredHomes) => {
      if (this.id) {
        //for check home is available or not
        registeredHomes = registeredHomes.map((home) => {
          //in single line
          return home.id === this.id ? this : home;

          // if (home.id === this.id) {
          //   return this;
          // }
          // return home;
        });
      } else {
        // add home page
        this.id = Math.random().toString();
        registeredHomes.push(this);
      }
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File Writing Concluded", error);
      });
    });
  }

  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callback) {
    Home.fetchAll((homes) => {
      const homeFound = homes.find((home) => home.id === homeId);
      callback(homeFound);
    });
  }

  static deleteById(homeId, callback) {
    Home.fetchAll((homes) => {
      homes = homes.filter((home) => home.id !== homeId);

      fs.writeFile(homeDataPath, JSON.stringify(homes), (error) => {
        Favourite.deleteById(homeId, callback);
      });
    });
  }
};
