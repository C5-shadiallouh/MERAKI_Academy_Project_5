const express = require("express");
const {addComment} = require("")

const commentRouter = express.Router();

commentRouter.post("/", addComment)
module.exports = commentRouter