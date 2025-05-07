const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { json } = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3000;

// Cấu hình mở rộng cho body-parser
app.use(bodyParser.json({
    // Bỏ qua việc kiểm tra encoding
    verify: (req, res, buf, encoding) => {
        req.rawBody = buf.toString();
    },
    type: [
        'application/json', 
        'text/plain', 
        'application/x-www-form-urlencoded'
    ]
}));

app.use(bodyParser.urlencoded({ 
    extended: true,
    // Bỏ qua các ràng buộc về encoding
    parameterLimit: 1000000 
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
