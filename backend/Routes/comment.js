const express = require("express");
const {addComment, getAllComments, updateComment} = require("")

const commentRouter = express.Router();

commentRouter.post("/:id", addComment)
commentRouter.get("/", getAllComments)
commentRouter.put("/", updateComment)

module.exports = commentRouter