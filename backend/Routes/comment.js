const express = require("express");
const {addComment, getAllComments, updateComment, deleteComment} = require("")

const commentRouter = express.Router();

commentRouter.post("/:id", addComment)
commentRouter.get("/", getAllComments)
commentRouter.put("/", updateComment)
commentRouter.delete("/", deleteComment)


module.exports = commentRouter