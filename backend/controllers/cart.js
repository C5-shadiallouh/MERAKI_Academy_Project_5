const connection = require(`../models/db`);

const addToCart = (req, res) => {
  const user_id = req.token.user_id;
  const { meal_id, order_id } = req.body;

  const query = `INSERT INTO cart (meal_id,user_id,order_id) VALUES (?,?,?)`;

  const data = [meal_id,user_id, order_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }

    res.status(201).json({
      success: true,
      massage: "Add to Cart",
      result,
    });
  });
};

/* const deleteFromCart = (req, res) => {
  const user_id = req.token.user_id;
  const { meal_id } = req.body;

  const query = `DELETE FROM cart WHERE user_id = ? and meal_id = ?`;

  const data = [meal_id, user_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result) {
      return res.status(404).json({
        success: false,
        massage: `The meal: ${meal_id} is not found`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Succeeded to delete meal with id: ${meal_id}`,
      result: result,
    });
  });
}; */

const getCart = (req, res) => {
  const query = `SELECT cart.*,meals.meal_name,meals.meal_price,meals.meal_price*cart.quantity AS total from cart INNER JOIN meals ON cart.meal_id =meals.id where cart.is_deleted=0;`
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err,
      });
    }

    if (result.length !== 0) {
      res.status(200).json({
        success: true,
        message: "All the Meals",
        result,
      });
    }

    res.status(404).json({
      message: `there is not any meal`,
    });
  });
};

/* const removeAll = (req, res) => {
  const query = `U FROM cart WHERE is_deleted=0 ?`;

  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err,
      });
    }

    res.status(200).json({
      success: true,
      message: " Delete All the Meals",
      result,
    });
  });
}; */

/* const addOrder = (req, res) => {
  const user_id = req.token.user_id;
  const { cart_id } = req.body;
  const query = `INSERT INTO order (user_id,cart_id) VALUES(?,?)`;
  const data = [user_id, cart_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      massage: "Add to Cart",
      result,
    });
  });
};
 */
module.exports = {
  addToCart,
  getCart,
};
