//core modules
const fs = require("fs");
const path = require("path");
const rootdir = require("../utils/pathutils");
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
    this.id = Math.random().toString();
    Home.fetchAll((registeredHomes) => {
      registeredHomes.push(this);

      fs.writeFile(homeDataPath, JSON.stringify(registeredHomes), (error) => {
        console.log("File Writing Concluded", error);
      });
    });
  }

//   save() {
//     this.id = Math.random().toString();
//     Home.fetchAll((registeredHomes) => {
//         registeredHomes.push(this);
//         fs.writeFile(homeDataPath, JSON.stringify(registeredHomes, null, 2), (error) => {
//             if (error) {
//                 console.log("Error writing file:", error);
//             } else {
//                 console.log("File saved successfully");
//             }
//         });
//     });
// }



  static fetchAll(callback) {
    fs.readFile(homeDataPath, (err, data) => {
      callback(!err ? JSON.parse(data) : []);
    });
  }

  static findById(homeId, callback) {
    Home.fetchAll(homes => {
      const homeFound = homes.find(home=> home.id === homeId);
      callback(homeFound);
    });
  }


};
