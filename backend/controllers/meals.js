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
      result,
    });
  });
};

const updateMealById = (req, res) => {
  const { meal_name, meal_price, image, description } = req.body;
  const id = req.params.id;

  const query = `SELECT * FROM meals WHERE id=?;`;
  const data = [id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `Server error`,
        err: err,
      });
    }
    if (!result) {
      res.status(404).json({
        success: false,
        massage: `The meal: ${id} is not found`,
        err: err,
      });
    } // result are the data returned by mysql server
    else {
      const query = `UPDATE meals SET meal_name=?, meal_price=?, image=?, description=?   WHERE id=?;`;
      const data = [
        meal_name || result[0].meal_name,
        meal_price || result[0].meal_price,
        image || result[0].image,
        description || result[0].description,
        id,
      ];

      connection.query(query, data, (err, result) => {
        if (result.affectedRows != 0)
          res.status(201).json({
            success: true,
            massage: `meal updated`,
            result: result,
          });
      });
    }
  });
};

const deleteMealById = (req, res) => {
  const id = req.params.id;

  const query = `UPDATE meals SET is_deleted=1 WHERE id=?;`;

  const data = [id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.changedRows) {
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

const gitMealById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT * FROM meals WHERE id=?;`;
  const data = [id];
  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }
    if (!result.length) {
      res.status(404).json({
        success: false,
        massage: "The meal is Not Found",
      });
    }
    res.status(200).json({
      success: true,
      massage: `The meal ${id}`,
      result: result,
    });
  });
};

const getMealByCategory = (req, res) => {
  const { name } = req.query;

  const query = `SELECT meals.* FROM meals INNER JOIN category ON meals.category_id=category.id  WHERE meals.is_deleted=0 AND category.category_name=?;`;
  const data = [name];

  connection.query(query, data, (err, result) => {
    if (err) {
      res.status(500).json({ err });
    }
    if (result.length) {
      res.status(200).json({
        success: true,
        massage: `All the meals for the category: ${name}`,
        result: result,
      });
    } else {
      res.status(404).json({
        success: false,
        massage: `The category: ${name} has no meals`,
      });
    }
  });
};
const paginatedMeals = (req, res) => {
  const limit = 20;
  const page = req.query.p;
  const offset = (page - 1) * limit;
  const query = `select * from meals limit ? OFFSET ?`;
  const data = [limit, offset];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.json(err);
    }
    res.status(200).json({
      products_page_count: result.length,
      page_number: page,
      products: result,
    });
  });
};

const paginatedMealByCategory = (req, res) => {
  const { name,p } = req.query;
  const limit = 20;
  const offset = (p - 1) * limit;
  const query = `SELECT  meals.* FROM meals INNER JOIN category ON meals.category_id=category.id  WHERE meals.is_deleted=0 AND category.category_name=? limit ? OFFSET ? ;`;
  const data = [name, limit, offset];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.json(err);
    }
    res.status(200).json({
      products_page_count: result.length,
      page_number: p,
      products: result,
    });
  });
};


const priceRange = (req, res) => {
  const { price_from, price_to } = req.query;
  const query = "SELECT * FROM meals WHERE meal_price between ? AND ?";
  const data = [price_from, price_to];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.json(err);
    }
    if (result.length) {
      return res.status(200).json(result);
    }
    res.status(404).json("There is no meals with this price range");
  });
};

const priceASC = (req,res) => {
const query = `SELECT * FROM meals
ORDER BY meal_price ASC;`;

  connection.query(query,(err, result) => {
    if (err) {
      return res.json(err);
    }
    if (result.length) {
      return res.status(200).json(result);
    }
    res.status(404).json("Not Found");
  });
}

const priceDESC = (req,res) => {
  const query = `SELECT * FROM meals
  ORDER BY meal_price DESC;`;
  
    connection.query(query, (err, result) => {
      if (err) {
        return res.json(err);
      }
      if (result.length) {
        return res.status(200).json(result);
      }
      res.status(404).json("Not Found");
    });
  }


  const addRate = (req,res) => {
   const meal_id = req.params.id
   const rater = req.token.userId
   const rate = req.body
   const query = `INSERT INTO rating (rating, rater, meal_id) VALUES (?,?,?);`;
   const data = [rate, rater, meal_id]
   connection.query(query,data,(err, result) => {
    if (err) {
      res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
    res.status(200).json({
      success: true,
      massage: "rate added",
      result: result,
    });
  });
  }

module.exports = {
  addMeal,
  getAllMeal,
  updateMealById,
  deleteMealById,
  gitMealById,
  getMealByCategory,
  paginatedMeals,
  priceRange,
  paginatedMealByCategory,
  priceASC,
  priceDESC,

};
