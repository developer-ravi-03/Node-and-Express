const { mongoose } = require("mongoose");
const favourite = require("./favorite"); // Import the favourite model

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

//this is for deleteing favorite automatically when home is deleted
homeSchema.pre("findOneAndDelete", async function (next) {
  const homeId = this.getQuery()["_id"];
  await favourite.deleteMany({ homeId: homeId });
  next();
});

module.exports = mongoose.model("Home", homeSchema);
