const { response } = require("express");
const express = require("express");

const { Mealmodel } = require("../models/meal.model");

const mealRouter = express.Router();

// add meal
mealRouter.post("/create", async (req, res) => {
  try {
    const data = req.body;
    // console.log(data);
    // const meals = new Mealmodel(data);
    // await meals.save();
    const meals = await Mealmodel.insertMany(data);
    response.send(meals);
  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

// all meal
mealRouter.get("/", async (req, res) => {
  try {
    const meal = await Mealmodel.find();
    res.send(meal);
  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

// particular meal
mealRouter.get("/:id", async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

// update meal
mealRouter.patch("/update/:id", async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

// delete meal
mealRouter.delete("/delete/:id", async (req, res) => {
  try {

  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

module.exports = {
  mealRouter,
};
