// const express = require("express");
// const bodyParser = require("body-parser");
// require("dotenv").config();

// const app = express();
// const port = process.env.PORT || 3000;

// // Sử dụng middleware để log raw body
// app.use((req, res, next) => {
//   let data = '';
//   req.setEncoding('utf8');
//   req.on('data', (chunk) => {
//     data += chunk;
//   });
//   req.on('end', () => {
//     req.rawBody = data;
//     console.log('Raw body:', data);
//     next();
//   });
// });

// // Cấu hình body-parser
// app.use(bodyParser.json({
//   verify: (req, res, buf) => {
//     req.rawBody = buf.toString();
//   }
// }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());
// app.use(bodyParser.raw({ type: '*/*' }));

// app.get("/", function (req, res) {
//   res.send("Hello World");
// });

// app.post("/webhook", function (req, res) {
//   console.log("req.body::>>", req.body);
//   console.log("req.rawBody::>>", req.rawBody);
//   res.send("Receive data successfully");
// });

// app.listen(port, () => {
//   console.log("RESTful API server started on: " + port);
// });


// ------------



const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to log raw body and handle different content types
app.use((req, res, next) => {
  // For POST, PUT, and PATCH requests
  if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
    let rawBody = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      rawBody += chunk;
    });
    req.on('end', () => {
      // Store raw body for later use
      req.rawBody = rawBody;
      next();
    });
  } else {
    next();
  }
});

// Comprehensive body parsing middleware
app.use(bodyParser.json({
  verify: (req, res, buf) => {
    // Additional verification and raw body capture for JSON
    req.rawBody = buf.toString();
  },
  limit: '10mb' // Adjust payload size limit as needed
}));
app.use(bodyParser.urlencoded({ 
  extended: true,
  limit: '10mb' 
}));
app.use(bodyParser.text({ 
  type: ['text/plain', 'application/json'],
  limit: '10mb'
}));
app.use(bodyParser.raw({ 
  type: '*/*',
  limit: '10mb' 
}));

// Logging middleware for better debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  
  if (req.rawBody) {
    console.log('Raw Body:', req.rawBody);
  }
  
  next();
});

// Root route
app.get("/", (req, res) => {
  res.send("Webhook Server is Running");
});

// Webhook endpoint with comprehensive logging
app.post("/webhook", (req, res) => {
  try {
    console.log("Received Webhook Data:");
    console.log("Content-Type:", req.headers['content-type']);
    console.log("Request Body:", req.body);
    console.log("Raw Body:", req.rawBody);

    // Basic validation (customize as needed)
    if (!req.body) {
      return res.status(400).send("No payload received");
    }

    // Process webhook payload here
    // Example: Basic payload logging
    res.status(200).json({
      status: "success",
      message: "Webhook received and processed",
      receivedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Webhook processing error:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Webhook Server started on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  app.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

