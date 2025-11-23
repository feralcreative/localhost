const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Store the last request details
let lastRequestDetails = null;

// Middleware to capture request details
app.use((req, res, next) => {
  // Only capture details for the root route
  if (req.path === "/" && req.method === "GET") {
    lastRequestDetails = {
      method: req.method,
      path: req.path,
      protocol: req.protocol,
      host: req.get("host"),
      headers: req.headers,
      query: req.query,
      ip: req.ip || req.connection.remoteAddress,
      timestamp: new Date().toISOString(),
      url: req.originalUrl,
    };
  }
  next();
});

// Serve static files from the root directory
app.use(express.static(__dirname));

// API endpoint to get request details
app.get("/api/request-details", (req, res) => {
  res.json(lastRequestDetails || {});
});

// Root route serves the OAuth callback page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 OAuth Callback URL: http://localhost:${PORT}`);
});
