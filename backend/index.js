const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");
const app = express();
//routers
const loginRouter = require("./routes/login")
const registerRouter = require("./Routes/register")
const roleRouter=require("./Routes/role")
const mealsRouter = require("./Routes/meals")
const usersRouter = require("./Routes/users")
const cartRouter=require(`./Routes/cart`)
const commentRouter = require("./Routes/comment")
const orderRouter=require(`./Routes/order`)

//built-in middleware
app.use(express.json());
app.use(cors());

// router middleware
app.use("/login",loginRouter)
app.use("/register",registerRouter)
app.use("/roles",roleRouter)
app.use("/meals",mealsRouter)
app.use("/users", usersRouter)
app.use(`/cart`,cartRouter)
app.use("/comment", commentRouter)
app.use("/order",orderRouter)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
