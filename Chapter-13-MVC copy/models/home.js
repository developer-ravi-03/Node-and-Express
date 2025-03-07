//core modules
const fs = require("fs");
const path = require("path");
const rootdir = require("../utils/pathutils");

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
      registeredHomes.push(this);
      const homeDataPath = path.join(rootdir, "data", "homes.json");
      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File Writing Concluded", error);
      });
    });
  }

  static fetchAll(callback) {
    const homeDataPath = path.join(rootdir, "data", "homes.json");
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
      // if (!err) {
      //   callback(JSON.parse(data));
      // } else {
      //   callback([]);
      // }
    });
  }
};
