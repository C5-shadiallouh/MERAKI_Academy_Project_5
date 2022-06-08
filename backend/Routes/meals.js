const express = require("express");
const {addCategory,getCategories} = require("../controllers/categorey")
const { addMeal,getAllMeal,updateMealById,deleteMealById, gitMealById, getMealByCategory,paginatedMeals,priceRange, paginatedMealByCategory, priceASC, priceDESC, addRate, deleteRate } = require(`../controllers/meals`);

const mealsRouter = express.Router();

mealsRouter.post(`/addmeal`, addMeal);
mealsRouter.post(`/addcategory`, addCategory);
mealsRouter.put("/update/:id", updateMealById)
mealsRouter.delete("/delete/:id", deleteMealById)
mealsRouter.get("/category", getMealByCategory)
mealsRouter.get("/id/:id", gitMealById)
mealsRouter.get(`/`,getAllMeal)
mealsRouter.get("/paginated",paginatedMeals)
mealsRouter.get("/price",priceRange)
mealsRouter.get("/pageInCategory", paginatedMealByCategory)
mealsRouter.get("/asc",priceASC)
mealsRouter.get("/desc",priceDESC)
mealsRouter.get("/allcategories",getCategories)
mealsRouter.post("/rating", addRate)
mealsRouter.delete("/rating", deleteRate)

module.exports = mealsRouter;
