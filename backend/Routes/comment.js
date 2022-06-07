const express = require("express");

//import CRUD comment
const {addComment, getAllComments, updateComment, deleteComment} = require("../controllers/comment");
const { authentication } = require("../middlewares/authentication");

//create comment Router
const commentRouter = express.Router();

//Routes
commentRouter.post("/:id",authentication,  addComment)
commentRouter.get("/", getAllComments)
commentRouter.put("/", updateComment)
commentRouter.delete("/", deleteComment)

//export Router
module.exports = commentRouter