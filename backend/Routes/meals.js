const express = require("express");
const {addCategory} = require("../controllers/categorey")
const { addMeal,getAllMeal } = require(`../controllers/meals`);

const mealsRouter = express.Router();

mealsRouter.post(`/addmeal`, addMeal);
mealsRouter.post(`/addcategory`, addCategory);

mealsRouter.get(`/`,getAllMeal)

module.exports = mealsRouter;
