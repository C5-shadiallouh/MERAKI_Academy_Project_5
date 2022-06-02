const connection = require(`../models/db`);

const addToCart = (req, res) => {
  const user_id = req.token.user_id;
  const { meal_id, order_id } = req.body;

  const query = `INSERT INTO cart (user_id,meal_id,order_id) VALUES=(?,?,?)`;

  const data = [user_id, meal_id, order_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
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







module.exports = {
  addToCart,
};






