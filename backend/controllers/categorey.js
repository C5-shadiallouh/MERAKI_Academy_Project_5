const connection = require("../models/db")


const addCategory=(req,res)=>{
    const {category}=req.body
    const query = "INSERT INTO category (category_name) VALUES (?)"
    const data = [category]
    connection.query(query,data,(err,result)=>{
        if(err){
            return res.json(err)
        }
        res.status(201).json({success:true,Message:"added new category",result})
    })
}
const getCategories=(req,res)=>{
    const query = 'SELECT * FROM category'
    connection.query(query,(err,result)=>{
        if(err){
            return res.json(err)
        }
        res.status(201).json({success:true,Message:"added new category",categories:result}) 
    })
}

module.exports= {addCategory}