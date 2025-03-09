const { getDb } = require("../utils/databaseUtils");
const { ObjectId } = require("mongodb");
module.exports = class Home {
  constructor(home, price, Location, rating, photoUrl, description, _id) {
    this.home = home;
    this.price = price;
    this.Location = Location;
    this.rating = rating;
    this.photoUrl = photoUrl;
    this.description = description;
    if (_id) {
      this._id = _id;
    }
  }

  save() {
    const db = getDb();
    if (this._id) {
      const updateFields = {
        home: this.home,
        price: this.price,
        Location: this.Location,
        rating: this.rating,
        photoUrl: this.photoUrl,
        description: this.description,
      };
      return db
        .collection("homes")
        .updateOne(
          { _id: new ObjectId(String(this._id)) },
          { $set: updateFields }
        );
    } else {
      return db.collection("homes").insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("homes").find().toArray();
  }

  static findById(homeId) {
    const db = getDb();
    return db
      .collection("homes")
      .find({ _id: new ObjectId(String(homeId)) })
      .next();
  }

  static deleteById(homeId) {
    const db = getDb();
    return db
      .collection("homes")
      .deleteOne({ _id: new ObjectId(String(homeId)) });
  }
};
