const connection=require("../models/db")


const addPermission=(req,res)=>{
    const {permission}=req.body
    const role_id = req.params.role_id
    const query="INSERT INTO permissions (permission) VALUES(?)"
    const data =[permission]
    connection.query(query,data,(err,result)=>{
        if(err)
        {res.json(err)}
        const query = "INSERT INTO role_permission (role_id,permissions_id) VALUES(?,?);"
        const data = [role_id,result.insertId]
        connection.query(query,data,(err,rolePermissionResult)=>{
            if (err){
                return res.json(err)
            }
            res.status(201).json(rolePermissionResult)
        })
    })
}
module.exports={addPermission}