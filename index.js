const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { json } = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3000;

// Middleware body-parser cho JSON
app.use(bodyParser.json());

// Middleware body-parser cho URL-encoded data
app.use(bodyParser.urlencoded({ 
    extended: true  // Cho phép parse các nested objects
}));

// Middleware body-parser cho raw data
app.use(bodyParser.raw());

// Middleware body-parser cho text
app.use(bodyParser.text());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/webhook", function (req, res) {
  console.log("req.body)::>>", req.body);
  res.send("Receive data successfully");
});

app.listen(port);

console.log("RESTful API server started on: " + port);
