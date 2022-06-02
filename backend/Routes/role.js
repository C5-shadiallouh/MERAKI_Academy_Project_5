const express = require("express");
const {addPermission}= require("../controllers/permissions")
const { addRole } = require("../controllers/role");
const roleRouter = express.Router();

roleRouter.post("/", addRole);
roleRouter.post("/addpermission/:role_id",addPermission)

module.exports = roleRouter;
