const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { json } = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3000;

// Middleware xử lý đa dạng
app.use((req, res, next) => {
    // Xử lý các vấn đề encoding
    req.headers['content-type'] = req.headers['content-type'] || 'application/json';
    
    // Loại bỏ encoding không hợp lệ
    if (req.headers['content-encoding'] === 'utf-8') {
        delete req.headers['content-encoding'];
    }
    if (req.headers['Content-Encoding'] === 'UTF-8') {
        delete req.headers['Content-Encoding'];
    }

    next();
});

// Cấu hình body-parser linh hoạt
app.use(bodyParser.json({
    type: [
        'application/json', 
        'text/plain', 
        'application/x-www-form-urlencoded'
    ],
    limit: '10mb'
}));

app.use(bodyParser.urlencoded({ 
    extended: true,
    limit: '10mb'
}));

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/webhook", function (req, res) {
  console.log("req.body)::>>", req.body);
  res.send("Receive data successfully");
});

app.listen(port);

console.log("RESTful API server started on: " + port);
