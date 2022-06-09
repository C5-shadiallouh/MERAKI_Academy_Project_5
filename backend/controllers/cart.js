const connection = require(`../models/db`);

const addToCart = (req, res) => {
  const user_id = req.token.user_id;
  const { meal_id, order_id } = req.body;

  const query = `INSERT INTO cart (meal_id,user_id,order_id) VALUES (?,?,?)`;

  const data = [user_id, meal_id, order_id];

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

const deleteFromCart = (req, res) => {
  const { meal_id } = req.body;

  const query = `UPDATE cart SET is_deleted=1 WHERE  meal_id = ?`;

  const data = [ meal_id];

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
};

const getCart = (req, res) => {
  const query = `SELECT * from cart where is_deleted=0`;
  connection.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err,
      });
    }

    if (result.length !== 0) {
      return res.status(200).json({
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

const removeAll = (req, res) => {
  const query = `UPDATE cart SET is_deleted=1`;

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
};

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

/* const subTotal = (req, res) => {
  const { quantity } = req.body;
  const query = `SELECT meals.pric*meals.quantity FROM meals INNER JOIN cart ON cart.meal_id = meals.id WHERE cart.is_deleted=0`;
  const data = [quantity];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: `server error`,
        err,
      });
    }
    res.status(201).json({
      success: true,
      message: `subTotal price ${result}`,
    });
  });
}; */

const totalPrice = (req, res) => {
  const { quantity } = req.body;
  //NOTE ====>PUT QUANTITY IN MEALS

  const query = `SELECT SUM (meals.price*meals.quantity) FROM meals INNER JOIN cart ON cart.meal_id = meals.id where cart.is_deleted=0`;
  const data = [quantity];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: `server error`,
        err,
      });
    }
    res.status(201).json({
      success: true,
      message: `total price ${result}`,
    });
  });
};

module.exports = {
  addToCart,
  getCart,
  totalPrice,
  deleteFromCart,
  removeAll,

  /* subTotal */
};
