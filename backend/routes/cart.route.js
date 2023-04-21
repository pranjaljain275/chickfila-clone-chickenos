const express = require("express");

const cartRouter = express.Router();

const { userAuthenticator } = require("../middlewares/userAuthenticator");
const { Cartmodel } = require("../models/cart.model");

// add cartItem
cartRouter.post("/create", userAuthenticator, async (req, res) => {
  try {
    const data = req.body;
    const meals = new Cartmodel(data);
    await meals.save();
    res.send(meals);
    console.log("Cart Item Added");
  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

// get cartItem
cartRouter.get("/", userAuthenticator, async (req, res) => {
  try {
    let { name, limit, page } = req.query;
    let queries = {};
    if (name == undefined) {
      queries = {};
    } else {
      queries.name = { $regex: name, $options: "i" };
    }
    // pagination
    let pageNo = (page - 1) * limit;
    const movies = await Cartmodel.find(queries).skip(pageNo).limit(limit);
    res.send(movies);
  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

// delete cartItem
cartRouter.delete("/:id", userAuthenticator, async (req, res) => {
  try {
    let ID = req.params.id;
    let data = await Cartmodel.findByIdAndDelete({ _id: ID });
    res.send(`Data of a user whose Id ${ID} is deleted`);
  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

module.exports = {
  cartRouter,
};
