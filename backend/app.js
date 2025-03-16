require("dotenv").config();
const express = require("express");
const app = express();
const postsRoutes = require("./router/posts");
const usersRoutes = require("./router/users");

const { Client } = require("pg");
const client = new Client({
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

client.connect();

client.query(`SELECT * FROM users;`, (err, res) => {
  if (!err) {
    console.log(res.rows);
  } else {
    console.log(err);
  }
  client.end();
});

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

module.exports = app;
