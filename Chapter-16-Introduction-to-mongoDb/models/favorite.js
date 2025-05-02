const { getDb } = require("../utils/databaseUtils");

module.exports = class Favourite {
  constructor(homeId) {
    this.homeId = homeId;
  }

  save() {
    const db = getDb();
    return db
      .collection("favouritess")
      .findOne({ homeId: this.homeId })
      .then((existingFav) => {
        if (!existingFav) {
          return db.collection("favouritess").insertOne(this);
        }
        return Promise.resolve();
      });
  }

  static getFavourites(callback) {
    const db = getDb();
    return db.collection("favouritess").find().toArray();
  }

  static deleteById(delHomeId) {
    const db = getDb();
    return db.collection("favouritess").deleteOne({ homeId: delHomeId });
  }
};
