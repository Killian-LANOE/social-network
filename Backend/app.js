require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const client = require("./DB_Connection");
const userRoutes = require("./routes/user");
const imagesRoutes = require("./routes/images");

app.use(express.json());

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
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
client.connect();

app.use("/api/users", userRoutes);
app.use("/api/images", imagesRoutes);
app.use("/api/images", express.static(path.join(__dirname, "images")));
