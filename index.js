const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Sử dụng middleware để log raw body
app.use((req, res, next) => {
  let data = '';
  req.setEncoding('utf8');
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    req.rawBody = data;
    console.log('Raw body:', data);
    next();
  });
});

// Cấu hình body-parser
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    req.rawBody = buf.toString();
  }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.raw({ type: '*/*' }));

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/webhook", function (req, res) {
  console.log("req.body::>>", req.body);
  console.log("req.rawBody::>>", req.rawBody);
  res.send("Receive data successfully");
});

app.listen(port, () => {
  console.log("RESTful API server started on: " + port);
});
