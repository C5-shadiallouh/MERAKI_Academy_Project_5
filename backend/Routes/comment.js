const express = require("express");
const {addComment, getAllComments} = require("")

const commentRouter = express.Router();

commentRouter.post("/:id", addComment)
commentRouter.get("/", getAllComments)
module.exports = commentRouter