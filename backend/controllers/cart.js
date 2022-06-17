const connection = require(`../models/db`);
const total=(req,res)=>{
  const user_id = req.token.user_id;

  const query = `SELECT COALESCE(SUM(total),0) AS total FROM cart WHERE user_id=? AND is_deleted=0;`;

  const data = [user_id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }

    return res.status(201).json({
      result
    });
  });
}
const addToCart = (req, res) => {
  const user_id = req.token.user_id;
  const { meal_id,quantity,one,total } = req.body;

  const query = `SELECT * FROM cart WHERE meal_id=? AND user_id =? AND is_deleted=0`;

  const data = [meal_id,user_id,quantity];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }

    if (result.length){
      const query = `UPDATE cart SET quantity=CASE WHEN ${one==true} THEN quantity+1
      ELSE ? END , total=CASE WHEN ${one==true} THEN total+?
      ELSE ? END WHERE meal_id=? AND user_id =? AND is_deleted=0`;
      const data = [quantity,total,total,meal_id,user_id,];
      connection.query(query,data,(err,result)=>{
        if (err) {
          return res.status(500).json({
            success: false,
            massage: "Server error",
            err: err,
          });
        }
        return res.status(201).json(result)
      })
    }
    else{
    const query = `INSERT INTO cart (meal_id,user_id,quantity,total) VALUES(?,?,?,?)`;

    const data = [meal_id,user_id,quantity,total];
    connection.query(query,data,(err,result)=>{
      if (err) {
        return res.status(500).json({
          success: false,
          massage: "Server error",
          err: err,
        });
      }
       res.status(201).json(result)
    })}


    
  });
};

const deleteFromCart = (req, res) => {
  const { id} = req.params;
  const token =req.token.user_id

  const query = `UPDATE cart SET is_deleted=1 WHERE  id = ? AND user_id=? `;

  const data = [id,token];

  connection.query(query, data, (err, result) => {
    console.log(result)
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
        massage: `The meal: ${id} is not found`,
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: `Succeeded to delete meal with id: ${id}`,
      result: result,
    });
  });
};

const getCart = (req, res) => {
  const user_id=req.token.user_id
  const query = `SELECT meals.meal_name,meals.meal_price,meals.image ,cart.quantity,cart.id FROM meals INNER JOIN cart ON cart.meal_id=meals.id  WHERE cart.is_deleted=0 AND user_id=?;`;
  const data=[user_id]
  connection.query(query,data, (err, result) => {
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

const updateById = (req,res) => {
  const { quantity,total } = req.body;
  const user_id=req.token.user_id
  const {id} = req.params;
console.log(id);
  const query = `UPDATE  cart SET quantity=${quantity},total=${total} where id=? AND user_id=?`;
  const data = [id,user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `Server error`,
        err: err,
      });
    } else {
      res.status(201).json({
        success: true,
        massage: `quantity updated`,
        result: result,
      });
    }
  });
};

const totalPrice = (req, res) => {
  const { quantity } = req.body;
  //NOTE ====>PUT QUANTITY IN MEALS

  const query = `SELECT SUM (meals.price*meals.quantity) FROM meals INNER JOIN cart ON cart.meal_id = meals.id where cart.is_deleted=0`;
  const data = [quantity];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
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
  updateById,
  total

  /* subTotal */
};
