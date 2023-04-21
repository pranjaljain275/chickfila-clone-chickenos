const { response } = require("express");
const express = require("express");
const { adminAuthenticator } = require("../middlewares/adminAuthenticator");

const { Mealmodel } = require("../models/meal.model");

const mealRouter = express.Router();

// add meal
mealRouter.post("/create", adminAuthenticator, async (req, res) => {
  try {
    const data = req.body;
    const meals = new Mealmodel(data);
    await meals.save();
    res.send(meals);
    console.log("Meal Added");
  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

// all meal
mealRouter.get("/", async (req, res) => {
  try {
    let { name, limit, page, sort, order } = req.query;
    let queries = {};
    if (name == undefined) {
      queries = {};
    } else {
      queries.name = { $regex: name, $options: "i" };
    }
    // sort
    let sorting = {};
    if (sort != undefined) {
      if (order == "desc") {
        sorting[sort] = -1;
      } else {
        sorting[sort] = 1;
      }
    }
    // pagination
    let pageNo = (page - 1) * limit;
    const data = await Mealmodel.find(queries)
      .sort(sorting)
      .skip(pageNo)
      .limit(limit);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

// particular meal
mealRouter.get("/:id", async (req, res) => {
  try {
    let ID = req.params.id;
    let data = await Mealmodel.find({ _id: ID });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

// update meal
mealRouter.put("/:id", adminAuthenticator, async (req, res) => {
  try {
    let ID = req.params.id;
    let updateTo = req.body;
    let data = await Mealmodel.findByIdAndUpdate({ _id: ID }, updateTo);
    res.send(`Data of a user whose Id ${ID} is updated`);
  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

// delete meal
mealRouter.delete("/:id", adminAuthenticator, async (req, res) => {
  try {
    let ID = req.params.id;
    let data = await Mealmodel.findByIdAndDelete({ _id: ID });
    res.send(`Data of a user whose Id ${ID} is deleted`);
  } catch (error) {
    console.log(error);
    res.send({ err: "Something went wrong" });
  }
});

module.exports = {
  mealRouter,
};
