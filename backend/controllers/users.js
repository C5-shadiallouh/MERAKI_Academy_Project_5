const connection = require("../models/db")

const getAllUsers = (req,res)  => {
    const query = `SELECT * FROM users WHERE is_deleted=0;`;

    connection.query(query, (err, result) => {
        if (err) {
          res.status(500).json({
            success: false,
            massage: "server error",
            err: err,
          });
        }
        res.status(200).json({
          success: true,
          massage: "All the users",
          result: result,
        });
      });

};

const updateUsersSettings = (req,res) => {
    const { firstName, lastName, age,city, email } = req.body;
    const id = req.params.id;
  
    const query = `SELECT * FROM users WHERE id=?;`;
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
          massage: `The user: ${id} is not found`,
          err: err,
        });
      } // result are the data returned by mysql server
      else {
        const query = `UPDATE users SET firstName=?, lastName=? , age=? ,city=? , email=? WHERE id=?;`;
        const data = [
            firstName || result[0].firstName,
            lastName || result[0].lastName,
            age || result[0].age,
            city || result[0].city,
            email || result[0].email,

          id,
        ];
  
        connection.query(query, data, (err, result) => {
          if (result.affectedRows != 0)
            res.status(201).json({
              success: true,
              massage: `user updated`,
              result: result,
            });
        });
      }
    });
}

module.exports = {getAllUsers,updateUsersSettings} ; 