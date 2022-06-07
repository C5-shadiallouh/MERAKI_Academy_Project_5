const connection = require(`../models/db`);

const addComment = (req, res) => {
    const meal_id = req.params.id
    const { comment} = req.body;
    const query = `INSERT INTO comment (comment,commenter,meal_id) VALUES (?,?,?);`;
    const data = [comment, commenter, meal_id];
  
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
        massage: "comment created",
        result: result,
      });
    });
  };

  const getAllComments = (req, res) => {
    const query = `SELECT * FROM comment `;
  
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
        message: "All the Comments",
        result,
      });
    });
  };

  module.exports = {addComment, getAllComments}