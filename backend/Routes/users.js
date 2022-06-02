const express = require("express")

const {getAllUsers,updateUsersSettings} = require("../controllers/users")
const usersRouter = express.Router()

usersRouter.get("/", getAllUsers)
usersRouter.put("/:id", updateUsersSettings)

module.exports = usersRouter