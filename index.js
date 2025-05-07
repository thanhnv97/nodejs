const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { json } = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.text({defaultCharset: 'utf-8'}));

app.use((req, res, next) => {
  console.log('req', req.data)
    if (req.headers['Content-Encoding'] === 'UTF-8') {
        delete req.headers['Content-Encoding'];
    }
    next();
});

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/webhook", function (req, res) {
  console.log("req.body)::>>", req.body);
  res.send("Receive data successfully");
});



app.use(function (req, res) {
  res.status(404).send({ url: req.originalUrl + " not found" });
});

app.listen(port);

console.log("RESTful API server started on: " + port);
