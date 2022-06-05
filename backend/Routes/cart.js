const express = require(`express`);

const {
  addToCart,
  deleteFromCart,
  getCart,
  removeAll,
  totalPrice,
  /* subTotal */
} = require(`../controllers/cart`);

const { authentication } = require(`../middlewares/authentication`);

const cartRouter = express.Router();
/* cartRouter.put(`/subtotal`, subTotal);
 */ cartRouter.put(`/totalPrice`, totalPrice);
cartRouter.post(`/add`, authentication, addToCart);
cartRouter.get(`/`, getCart);
cartRouter.delete(`/removeAll`, removeAll);

cartRouter.delete(`/delete`, authentication, deleteFromCart);

module.exports = cartRouter;
