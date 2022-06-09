const express=require(`express`)

const {createOrder, getOrder, updateOrder}=require(`../controllers/order`)
const orderRouter=express.Router()


orderRouter.post(`/create`,createOrder)
orderRouter.get(`/get`,getOrder)
orderRouter.put(`/edit`,updateOrder)


module.exports=orderRouter