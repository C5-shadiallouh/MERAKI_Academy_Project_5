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
const stripe = require("stripe")('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

app.use(express.static("public"));

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.post("/create-payment-intent", async (req, res) => {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: "eur",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});


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
