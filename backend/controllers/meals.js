const connection = require(`../models/db`);

const addMeal = (req, res) => {
  const { meal_name, meal_price, image, description, category_id } = req.body;
  const query = `INSERT INTO meals (meal_name, meal_price, image,description,category_id) VALUES (?,?,?,?,?);`;
  const data = [meal_name, meal_price, image, description, category_id];

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
      massage: "meal created",
      result: result,
    });
  });
};

const getAllMeal = (req, res) => {
  const query = `SELECT * FROM meals `;

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
      message: "All the Meals",
      result
    })


  });
};




module.exports = {
  addMeal,
  getAllMeal,
};
