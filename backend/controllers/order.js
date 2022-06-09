const connection = require(`../models/db`);

const createOrder = (req,res) => {
  const user_id  = req.token.user_id;
  const query = `INSERT INTO orders (user_id) VALUES (?)`;
  const data = [user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
        console.log(err)
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      massage: "create order",
      result,
    });
  });
};

const updateOrder = (req,res) => {
  const { user_id } = req.body
  const query = `UPDATE orders SET is_deleted=1 WHERE  user_id = ?`;
  const data=[user_id]
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "delete Server error",
        err: err,
      });
    }
    const query = `INSERT INTO orders (user_id) VALUES(?)`;
    const data = [user_id];
    connection.query(query, data, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          massage: "add Server error",
          err: err,
        });
      }
      res.status(201).json({
        success: true,
        massage: "create order",
        result,
      });
    });
  });
};

const getOrder = (req,res) => {
  const { user_id } = req.body
  const query = `SELECT * from orders WHERE  user_id=?`;
  const data = [user_id];
  connection.query(query, data, (err, result) => {
      console.log(result)
    if (result.length !== 0) {
      return res.status(200).json({
        success: true,
        message: "All the orders",
        result,
      });
    }

    res.status(404).json({
      message: `there is not any order`,
    });
  });
};

module.exports = {
  createOrder,
  updateOrder,
  getOrder,
};
