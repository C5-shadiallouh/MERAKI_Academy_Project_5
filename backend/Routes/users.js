const express = require("express")

const {getAllUsers,updateUsersSettings,deleteUserById} = require("../controllers/users")
const usersRouter = express.Router()

usersRouter.get("/", getAllUsers)
usersRouter.put("/:id", updateUsersSettings)
usersRouter.delete("/:id", deleteUserById)

module.exports = usersRouter