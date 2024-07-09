const client = require("./DB_Connection");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const dataRoutes = require("./routes/data");

app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
client.connect();

app.use("/users", dataRoutes);
