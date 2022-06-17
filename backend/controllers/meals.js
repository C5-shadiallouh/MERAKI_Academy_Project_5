const connection = require(`../models/db`);

const addMeal = (req, res) => {
  const {category,meal_name,meal_price,image } = req.body;
  const query = `SELECT category.id from category WHERE category_name=?`;
const data=[category]
  connection.query(query, data, (err, result) => {
    console.log(result);
    if (err) {
     return res.status(500).json({
        success: false,
        massage: "Server error",
        err,
      });
    }
    if(!result.length)
   return res.status(500).json({
      message:"the category is not found"
    })
   if(result){
    const query=`INSERT INTO meals (meal_name, meal_price, image,category_id) VALUES (?,?,?,?);`
    const category_id=result[0].id
    const data=[meal_name,meal_price,image,category_id]
    connection.query(query,data,(err,result)=>{
      if (err) {
        return res.status(500).json({
           success: false,
           massage: "Server error",
           err,
         });
       }

       res.status(201).json({
        success:true,
        message:`meal added successfully`,
        
       })
    })
   }
  });
};


/*   const query = ;
   const data = [ meal_name, meal_price, image,  category];*/

const getAllMeal = (req, res) => {
  const query = `SELECT * FROM meals WHERE is_deleted=0 `;

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
  const { meal_name, meal_price, image } = req.body;
  const id = req.params.id;

  const query = `SELECT * FROM meals WHERE id=? ;`;
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
      const query = `UPDATE meals SET meal_name=?, meal_price=?, image=?  WHERE id=? AND is_deleted=0;`;
      const data = [
        meal_name || result[0].meal_name,
        meal_price || result[0].meal_price,
        image || result[0].image,
        id,
      ];
      connection.query(query, data, (err, result) => {
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
  const query = `SELECT * FROM meals WHERE id=? AND is_deleted=0;`;
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
  const query = `select * from meals WHERE is_deleted=0 limit ? OFFSET ? `;
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
  const { name, p } = req.query;
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
  let price_from = req.query.price_from;
  req.query.price_from ? "" : (price_from = 0);
  let price_to = req.query.price_to;
  req.query.price_to ? "" : (price_to = 999);
  let sort = req.query.sort;
  req.query.sort ? console.log(true) : (sort = "ASC");
  const query = `SELECT * FROM meals WHERE meal_price between ? AND ?  ORDER BY meal_price ${sort}`;
  const data = [price_from, price_to, sort];
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

const priceASC = (req, res) => {
  const query = `SELECT * FROM meals
ORDER BY meal_price ASC;`;

  connection.query(query, (err, result) => {
    if (err) {
      return res.json(err);
    }
    if (result.length) {
      return res.status(200).json(result);
    }
    res.status(404).json("Not Found");
  });
};

const priceDESC = (req, res) => {
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
};

const addRate = (req, res) => {
  const meal_id = req.params.id;
  console.log(req.token);
  const rater = req.token.user_id;
  const rate = req.body.rate;
  const query = `SELECT *  FROM rating Where meal_id=? AND rater=?;`;

  
  const data = [meal_id,rater];
  connection.query(query, data, (err, result) => {
    if (err) {
     return res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    }
   
    if(!result.length)
   {
    console.log("Aaaaaaaaaaaaaaaaaaa");
    const query = `INSERT INTO rating (rate, rater, meal_id) VALUES (?,?,?);`;
    const data = [rate, rater, meal_id];
    connection.query(query, data, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          massage: "Server error",
          err: err,
        });
      }
      res.status(201).json(result)
    
    })
   }
   else{
    const query = `UPDATE rating set rate=? WHERE rater=? AND meal_id=? `;
    const data = [rate, rater, meal_id];
    connection.query(query, data, (err, result) => {
      if (err) {
        return res.status(500).json({
          success: false,
          massage: "Server error",
          err: err,
        });
      }
      res.status(201).json(result)
    
    })

   }
  });
};

const deleteRate = (req, res) => {
  const id = req.params.id;

  const query = `UPDATE rating SET is_deleted=1 WHERE id=?;`;

  const data = [id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "Server Error",
        err: err,
      });
    }

    res.status(200).json({
      success: true,
      massage: `Succeeded to delete rate with id: ${id}`,
      result: result,
    });
  });
};

const updateRate = (req, res) => {
  const rate = req.body;
  const id = req.params.id;

  const query = `SELECT * FROM rating WHERE id=?;`;
  const data = [id];

  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(404).json({
        success: false,
        massage: `Server error`,
        err: err,
      });
    } else {
      const query = `UPDATE rating SET rate=? WHERE id=?;`;
      const data = [rate || result[0].rate, id];

      connection.query(query, data, (err, result) => {
        if (err) {
          return res.status(404).json({
            success: false,
            massage: `Server error`,
            err: err,
          });
        }
        if (result) {
          res.status(201).json({
            success: true,
            massage: `rate updated`,
            result: result,
          });
        }
      });
    }
  });
};

const getRates = (req, res) => {
  const meal_id = req.params.id;
  const query = `SELECT AVG(rate) AS AverageRate FROM rating Where meal_id=?;`;
  const data = [meal_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err,
      });
    }

    res.status(200).json({
      success: true,
      message: "All the rates",
      result,
    });
  });
};
const getterRates = (req, res) => {
  const meal_id = req.params.id;
  const user_id = req.token.user_id
  const query = `SELECT *  FROM rating Where meal_id=? AND rater=?;`;
  const data = [meal_id,user_id];
  connection.query(query, data, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Server Error",
        err,
      });
    }

    res.status(200).json(
      result
    );
  });
};

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
  addRate,
  deleteRate,
  getRates,
  updateRate,
  getterRates,
};
