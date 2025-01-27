const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const { adminOnlyMiddleware } = require('./middlewares');
const passport = require("passport");
const orderRoutes = require('./routes/order');
const userRoutes = require("./routes/user");

require('./auth/authStrategies');

const app = express();

// app.use(basicAuthMiddleware);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  return res.json({ status: true });
});

app.use(userRoutes);
app.use(passport.authenticate('jwt', {session: false}), adminOnlyMiddleware, orderRoutes);


mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Successfully");
});

mongoose.connection.on("error", (err) => {
  console.log("An error occurred while connecting to MongoDB");
  console.log(err);
});


module.exports = app;