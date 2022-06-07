const express = require("express");
const {addComment} = require("")

const commentRouter = express.Router();

commentRouter.post("/:id", addComment)
module.exports = commentRouter