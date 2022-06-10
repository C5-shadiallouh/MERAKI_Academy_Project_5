const connection = require(`../models/db`);

const addRole = (req, res) => {
  const { role } = req.body;

  const query = `INSERT INTO roles (role) VALUES (?)`;
  const data = [role];
  connection.query(query, data, (err, results) => {
    if (err) {
      return res.status(500).json({
        success: false,
        massage: "server error*",
        err: err,
      });
    }
    res.status(201).json({
      success: true,
      massage: "Success role created",
      results,
    });
  });
};
const updateRole = (req, res) => {
  const { role_id } = req.body;
  const id = req.params.id;
  const query ="UPDATE users SET role_id = ? WHERE id=?"
  const data=[role_id,id]
  connection.query(query,data,(err,result)=>{
    if(err)
    {return res.json(err)}
    res.status(201).json(result)
  })

  
};

module.exports = {
  addRole,updateRole
};




