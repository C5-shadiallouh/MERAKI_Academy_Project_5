const express = require("express");
const {addCategory} = require("../controllers/categorey")
const { addMeal,getAllMeal,updateMealById,deleteMealById, gitMealById, getMealByCategory } = require(`../controllers/meals`);

const mealsRouter = express.Router();

mealsRouter.post(`/addmeal`, addMeal);
mealsRouter.post(`/addcategory`, addCategory);
mealsRouter.get(`/`,getAllMeal)
mealsRouter.put("/update/:id", updateMealById)
mealsRouter.delete("/delete/:id", deleteMealById)
mealsRouter.get("/:id", gitMealById)
mealsRouter.get("/", getMealByCategory)

module.exports = mealsRouter;
