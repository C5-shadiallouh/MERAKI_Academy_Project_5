const express = require("express")

const {addmeal}=require(`../controllers/meals`)

const mealsRouter = express.Router()



mealsRouter.post(`/addmeal`,addmeal)







module.exports = mealsRouter