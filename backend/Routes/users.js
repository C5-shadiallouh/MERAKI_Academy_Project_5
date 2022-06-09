const express = require("express")
const {authentication} = require("../middlewares/authentication")
const {authorization} = require("../middlewares/authorization")
const {updateRole} = require("../controllers/role")
const {getAllUsers,updateUsersSettings,deleteUserById, getUserByEmail} = require("../controllers/users")
const usersRouter = express.Router()

usersRouter.get("/",authentication,authorization("Get_All_Users"), getAllUsers)
usersRouter.put("/:id", updateUsersSettings)
usersRouter.delete("/delete/:id",authentication,authorization("Delete_User"), deleteUserById)
usersRouter.get("/:email", getUserByEmail)
usersRouter.put("/updaterole/:id",updateRole)
module.exports = usersRouter