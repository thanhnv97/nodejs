const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { json } = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  console.log("Hello World::>>");
  res.send("Hello World");
});

app.post("/webhook", function (req, res) {
  console.log("req.body)::>>", req.headers);
  return
});

app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);

console.log("RESTful API server started on: " + port);
