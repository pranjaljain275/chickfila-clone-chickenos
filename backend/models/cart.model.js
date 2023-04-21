const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    image: String,
    name: String,
    quantity: String,
    quant: {
      type: Number,
      default: 1,
    },
    price: Number,
    userId: String,
  },
  {
    versionKey: false,
  }
);

const Cartmodel = mongoose.model("cart", cartSchema);

module.exports = {
  Cartmodel,
};
