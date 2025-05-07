const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { json } = require("body-parser");
require("dotenv").config();
const port = process.env.PORT || 3000;

// Middleware to ensure proper UTF-8 decoding
app.use(bodyParser.json({ 
  type: ['application/json', 'application/csp-report'],
  verify: (req, res, buf, encoding) => {
    // Ensure UTF-8 decoding
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}));

// Alternative middleware for newer Express versions
app.use(express.json({
  type: ['application/json', 'application/csp-report'],
  strict: true,
  limit: '1mb',
  verify: (req, res, buf, encoding) => {
    try {
      // Decode and validate UTF-8 content
      const decoded = buf.toString(encoding || 'utf8');
      
      // Optional: Additional validation
      if (!isValidUTF8(decoded)) {
        throw new Error('Invalid UTF-8 encoding');
      }
      
      req.rawBody = decoded;
    } catch (error) {
      console.error('Decoding error:', error);
      throw error;
    }
  }
}));

// Utility function to validate UTF-8 decoding
function isValidUTF8(str) {
  // Check for valid Unicode characters
  const unicodeRegex = /^(?:[\x00-\x7F]|[\xC2-\xDF][\x80-\xBF]|\xE0[\xA0-\xBF][\x80-\xBF]|[\xE1-\xEC\xEE\xEF][\x80-\xBF]{2}|\xED[\x80-\x9F][\x80-\xBF]|\xF0[\x90-\xBF][\x80-\xBF]{2}|[\xF1-\xF3][\x80-\xBF]{3}|\xF4[\x80-\x8F][\x80-\xBF]{2})*$/;
  return unicodeRegex.test(str);
}


app.get("/", function (req, res) {
  res.send("Hello World");
});

app.post("/webhook", function (req, res) {
  console.log("req.body)::>>", req.body);
  res.send("Receive data successfully");
});

app.listen(port);

console.log("RESTful API server started on: " + port);
