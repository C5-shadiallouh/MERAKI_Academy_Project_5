const express = require("express");
require("dotenv").config();
const cors = require("cors");
const socket = require("socket.io");
require("./models/db");
const app = express();
//routers
const loginRouter = require("./routes/login");
const registerRouter = require("./Routes/register");
const roleRouter = require("./Routes/role");
const mealsRouter = require("./Routes/meals");
const usersRouter = require("./Routes/users");
const cartRouter = require(`./Routes/cart`);
const commentRouter = require("./Routes/comment");
const orderRouter = require(`./Routes/order`);

//built-in middleware
app.use(express.json());
app.use(cors());

// router middleware
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/roles", roleRouter);
app.use("/meals", mealsRouter);
app.use("/users", usersRouter);
app.use(`/cart`, cartRouter);
app.use("/comment", commentRouter);
app.use("/order", orderRouter);
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
const io = socket(server, {
  cors: {
    origin: "http//localhost:3000",
  },
});
io.on("CONNECTION", (socket) => {
  console.log(socket);

  socket.on("JOIN_ROOM", (data) => {
    console.log(data);
    socket.join(data);
  });
  socket.on("SEND_MESSAGE", (data) => {
    // data = { room: 5, content: "hello" };
    socket.to(data.room).emit("RECIVE_MESSAGE", data.content);
  });
  socket.on("DISCONNECT",()=>{
    console.log("user left");
  })
});
