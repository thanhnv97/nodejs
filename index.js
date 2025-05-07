const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { json } = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/webhook", function (req, res) {
  console.log("req.body)::>>", req.body);
  res.send("Receive data successfully");
});

app.listen(port);

console.log("RESTful API server started on: " + port);
