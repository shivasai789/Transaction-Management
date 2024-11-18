require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user-routes");
const transactionRoutes = require("./routes/transaction-routes");

const app = express();
const port = process.env.PORT || 5000;

mongoose
  .connect(
    process.env.MONGODB_URL
  )
  .then(() => console.log("DB connected.."))
  .catch((error) => {
    console.log(error);
  });

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to transaction management!");
});

app.use("/api/user", userRoutes);
app.use("/api/transaction", transactionRoutes);

app.listen(port, () => {
  console.log("Server Running...");
});
