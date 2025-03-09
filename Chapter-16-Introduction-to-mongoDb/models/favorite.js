const { getDb } = require("../utils/databaseUtils");

module.exports = class Favourite {
  constructor(homeId) {
    this.homeId = homeId;
  }

  save() {
    const db = getDb();
    return db
      .collection("favorites")
      .findOne({ homeId: this.homeId })
      .then((existingFav) => {
        if (!existingFav) {
          return db.collection("favorites").insertOne(this);
        }
        return Promise.resolve();
      });
  }

  static getFavourites(callback) {
    const db = getDb();
    return db.collection("favorites").find().toArray();
  }

  static deleteById(delHomeId) {
    const db = getDb();
    return db.collection("favorites").deleteOne({ homeId: delHomeId });
  }
};
