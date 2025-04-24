const mongoose = require("mongoose");
// const FavoriteSchema = mongoose.Schema;
const favouriteSchema = new mongoose.Schema({
  homeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Home",
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Favourite", favouriteSchema);
