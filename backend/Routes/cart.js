const express = require(`express`);

const {
  addToCart,
/*   deleteFromCart,
 */  getCart,
/*   removeAll,
 */} = require(`../controllers/cart`);

const { authentication } = require(`../middlewares/authentication`);

const cartRouter = express.Router();

cartRouter.post(`/add`, authentication, addToCart);
cartRouter.get(`/`, getCart);
/* cartRouter.delete(`/removeAll`, removeAll);
 */
/* cartRouter.delete(`/delete`, authentication, deleteFromCart);
 */
module.exports = cartRouter;
