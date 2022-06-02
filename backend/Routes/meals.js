const express = require("express");
const {addCategory} = require("../controllers/categorey")
const { addMeal,getAllMeal,updateMealById,deleteMealById } = require(`../controllers/meals`);

const mealsRouter = express.Router();

mealsRouter.post(`/addmeal`, addMeal);
mealsRouter.post(`/addcategory`, addCategory);
mealsRouter.get(`/`,getAllMeal)
mealsRouter.put("/update/:id", updateMealById)
mealsRouter.delete("/delete/:id", deleteMealById)

module.exports = mealsRouter;
