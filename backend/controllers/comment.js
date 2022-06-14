const connection = require(`../models/db`);

const addComment = (req, res) => {
    const meal_id = req.params.id
    const  commenter = req.token.user_id
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
        commenter:req.token.user_name
      });
    });
  };                


  const getAllComments = (req, res) => {
    const {id}=req.params
    const query = `SELECT comment.*, users.firstName, users.lastName FROM comment INNER JOIN users on comment.commenter=users.id WHERE meal_id=? `;
  const data=[id]
    connection.query(query,data, (err, result) => {
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

  const updateComment = (req, res) => {
    const { comment } = req.body;
    const id = req.params.id;
  
    const query = `SELECT * FROM comment WHERE id=?;`;
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
          err: err,
        });
      } // result are the data returned by mysql server
      else {
        const query = `UPDATE comment SET comment=?  WHERE id=?;`;
        const data = [
          comment || result[0].comment,
          id,
        ];
  
        connection.query(query, data, (err, result) => {
          if (result.affectedRows != 0)
            res.status(201).json({
              success: true,
              massage: `comment updated`,
              result: result,
            });
        });
      }
    });
  };


  const deleteComment = (req, res) => {
    const id = req.params.id;
  
    const query = `UPDATE comment SET is_deleted=1 WHERE id=?;`;
  
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
          err: err,
        });
      }
      res.status(200).json({
        success: true,
        massage: `Succeeded to delete comment with id: ${id}`,
        result: result,
      });
    });
  };


  module.exports = {addComment, getAllComments, updateComment, deleteComment}