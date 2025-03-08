const db = require("../utils/databaseUtils");

module.exports = class Home {
  constructor(home, price, Location, rating, photoUrl, description, id) {
    this.home = home;
    this.price = price;
    this.Location = Location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    this.id = id;
  }

  save() {
    // if (this.id) {
    //   return db.execute(
    //     `UPDATE homes SET home = ?, price = ?, \`Location\` = ?, rating = ?, photoUrl = ?, description = ? WHERE id = ?`,
    //     [
    //       this.home,
    //       this.price,
    //       this.Location,
    //       this.rating,
    //       this.photoUrl,
    //       this.description,
    //       this.id,
    //     ]
    //   );
    // } else {
    //   return db.execute(
    //     `INSERT INTO homes (home, price, \`Location\`, rating, photoUrl, description) VALUES (?, ?, ?, ?, ?, ?)`,
    //     [
    //       this.home,
    //       this.price,
    //       this.Location,
    //       this.rating,
    //       this.photoUrl,
    //       this.description,
    //     ]
    //   );
    // }
    if (this.id) {
      // update
      return db.execute(
        "UPDATE homes SET home=?, price=?, Location=?, rating=?, photoUrl=?, description=? WHERE id=?",
        [
          this.home,
          this.price,
          this.Location,
          this.rating,
          this.photoUrl,
          this.description,
          this.id,
        ]
      );
    } else {
      // insert
      return db.execute(
        "INSERT INTO homes (home, price, Location, rating, photoUrl, description) VALUES (?, ?, ?, ?, ?, ?)",
        [
          this.home,
          this.price,
          this.Location,
          this.rating,
          this.photoUrl,
          this.description,
        ]
      );
    }
  }

  static fetchAll() {
    return db.execute(`SELECT * FROM homes`);
  }

  static findById(homeId) {
    return db.execute(`SELECT * FROM homes WHERE homes.id = ?`, [homeId]);
  }

  static deleteById(homeId) {
    return db.execute(`DELETE FROM homes WHERE homes.id = ?`, [homeId]);
  }
};
