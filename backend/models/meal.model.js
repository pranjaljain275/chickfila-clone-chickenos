const mongoose = require("mongoose");

const mealSchema = mongoose.Schema(
  {
    image: String,
    name: String,
    quantity: String,
    price: String,
    userId: String
  },
  {
    versionKey: false,
  }
);

const Mealmodel = mongoose.model("meal", mealSchema);

module.exports = {
  Mealmodel,
};
