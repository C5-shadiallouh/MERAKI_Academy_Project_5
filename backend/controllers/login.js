const connection = require("../models/db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const login = (req,res)=>{
    const {email,password} = req.body
    const query = "SELECT * FROM users WHERE email=?"
    const data = [email]
    connection.query(query,data,(err,result)=>{
        if (err)
        {return res.json(err)}
        if(result.length){
            return(
                bcrypt.compare(password,result[0].password,(err,compareResult)=>{
                    if (err)
                    {return res.json(err)}
                    if(compareResult){
                        const payload ={
                            user_id:result[0].id,
                            role_id:result[0].role_id,
                            email:result[0].email
                        }
                        const token=jwt.sign(payload,process.env.SECRET)
                        return res.status(200).json({success:true,token,isAdmin:result[0].role_id})
                    }
                    return res.status(403).json({success:false,message:"wrong password"})
                })
            )
        }
        return res.status(404).json({success:false,message:"Email doesn't Exist"})
    })
}
module.exports = {login}