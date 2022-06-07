const connection = require(`../models/db`);

const addComment = (req, res) => {
    const { comment,  } = req.body;
    const query = `INSERT INTO comment (comment) VALUES (?);`;
    const data = [comment];
  
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

  module.exports = {addComment}