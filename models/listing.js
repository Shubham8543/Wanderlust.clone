const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const listingSchema = new Schema({
  title: String,
  description: String,
  image: {
    type: String,
    default:
      "https://unsplash.com/photos/seashore-during-golden-hour-KMn4VEeEPR8",
    set: (v) =>
      v === ""
        ? "https://unsplash.com/photos/seashore-during-golden-hour-KMn4VEeEPR8"
        : v,
  },

  price: Number,
  location: String,
  country: String,
});

const listing = mongoose.model("listing", listingSchema);
module.exports = listing;
