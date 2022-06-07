const express = require("express")

const {getAllUsers,updateUsersSettings,deleteUserById, getUserByEmail} = require("../controllers/users")
const usersRouter = express.Router()

usersRouter.get("/", getAllUsers)
usersRouter.put("/:id", updateUsersSettings)
usersRouter.delete("/:id", deleteUserById)
usersRouter.get("/:email", getUserByEmail)

module.exports = usersRouter