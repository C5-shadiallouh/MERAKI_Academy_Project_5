const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./models/db");
const app = express();
//routers

//built-in middleware
app.use(express.json());
app.use(cors());

// router middleware

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
