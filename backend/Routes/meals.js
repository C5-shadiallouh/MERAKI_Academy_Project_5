const express = require("express");

const { addMeal,getAllMeal } = require(`../controllers/meals`);

const mealsRouter = express.Router();

mealsRouter.post(`/addmeal`, addMeal);

mealsRouter.get(`/`,getAllMeal)

module.exports = mealsRouter;
