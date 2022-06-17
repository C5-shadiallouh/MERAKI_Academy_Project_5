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
    const query= 'UPDATE cart set order_id=? , is_deleted=1 WHERE user_id=? AND is_deleted=0'
    const data =[result.insertId,user_id]
    connection.query(query, data, (err, result) => {
      if (err) {
          console.log(err)
        return res.status(500).json({
          success: false,
          massage: "Server error",
          err: err,
        });
      }
    res.status(201).json(result)
    
    })
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
  const query = `SELECT * from cart WHERE  is_deleted=1 AND order_id != null`;
  connection.query(query, (err, result) => {
      console.log(result)
  })
};

module.exports = {
  createOrder,
  updateOrder,
  getOrder,
};
