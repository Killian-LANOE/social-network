require("dotenv").config();
const express = require("express");
const app = express();
const postsRoutes = require("./router/posts");
const usersRoutes = require("./router/users");
const path = require("path");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());

app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
