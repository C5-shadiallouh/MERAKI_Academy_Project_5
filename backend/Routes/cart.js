const express = require(`express`);

const {
  addToCart,
  deleteFromCart,
  getCart,
  removeAll,
  totalPrice,
  updateById,
  /* subTotal */
} = require(`../controllers/cart`);

const { authentication } = require(`../middlewares/authentication`);

const cartRouter = express.Router();
/* cartRouter.put(`/subtotal`, subTotal);
 */ cartRouter.put(`/totalPrice`, totalPrice);
cartRouter.post(`/add/:id`, authentication, addToCart);
cartRouter.get(`/`, getCart);
cartRouter.delete(`/removeAll`, removeAll);
cartRouter.put(`/update/:id`,updateById)

cartRouter.delete(`/delete/:id`, deleteFromCart);

module.exports = cartRouter;
