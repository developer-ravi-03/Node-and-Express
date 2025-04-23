const { mongoose } = require("mongoose");

const homeSchema = mongoose.Schema({
  home: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  Location: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  photoUrl: {
    type: String,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Home", homeSchema);

//   save() {
//     const db = getDb();
//     if (this._id) {
//       const updateFields = {
//         home: this.home,
//         price: this.price,
//         Location: this.Location,
//         rating: this.rating,
//         photoUrl: this.photoUrl,
//         description: this.description,
//       };
//       return db
//         .collection("homes")
//         .updateOne(
//           { _id: new ObjectId(String(this._id)) },
//           { $set: updateFields }
//         );
//     } else {
//       return db.collection("homes").insertOne(this);
//     }
//   }

//   static fetchAll() {
//     const db = getDb();
//     return db.collection("homes").find().toArray();
//   }

//   static findById(homeId) {
//     const db = getDb();
//     return db
//       .collection("homes")
//       .find({ _id: new ObjectId(String(homeId)) })
//       .next();
//   }

//   static deleteById(homeId) {
//     const db = getDb();
//     return db
//       .collection("homes")
//       .deleteOne({ _id: new ObjectId(String(homeId)) });
//   }
// };
