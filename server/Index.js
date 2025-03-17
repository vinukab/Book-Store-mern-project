const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); //helps to parse JSON data
app.use(
  cors({
    origin: "http://localhost:5173", //allows only the 5173 port origin to access the server
    credentials: true, //accepts cookies from the client
  })
);

const bookRoutes = require("./src/books/book.route.js");
const orderRoutes = require("./src/orders/order.route.js");
const userRoutes= require("./src/users/user.route.js");

app.use("/api/books", bookRoutes); //prefixes any route in book.route.js with /api/books
app.use("/api/orders", orderRoutes); //prefixes any route in order.route.js with /api/orders
app.use("/api/auth", userRoutes); //prefixes any route in user.route.js with /api/auth

async function main() {
  await mongoose.connect(process.env.DB_URL); //connects to the database using the URL from .env file
  app.use("/", (req, res) => {
    res.send("Welcome to my Book Store server!!!");
  });
}
main()
  .then(() => console.log("MongoDB connect successfull!"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`Example port is listening on port ${port}`);
});
