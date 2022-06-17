const express=require(`express`)

const {createOrder, getOrder, updateOrder}=require(`../controllers/order`)
const { authentication } = require("../middlewares/authentication")
const orderRouter=express.Router()


orderRouter.post(`/create`,authentication,createOrder)
orderRouter.get(`/get`,getOrder)
orderRouter.put(`/edit`,updateOrder)


module.exports=orderRouter