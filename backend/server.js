const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000; // Use the environment-provided port or default to 5000

// Enable CORS for specific origin (frontend domain)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // Replace '*' with your Vercel frontend domain for production
  })
);

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// File path to store events
const eventsFilePath = path.join(__dirname, "events.json");

// Ensure events.json file exists
if (!fs.existsSync(eventsFilePath)) {
  fs.writeFileSync(eventsFilePath, JSON.stringify([])); // Create an empty events.json file if it doesn't exist
}

// Helper function to read events from the file
const readEventsFromFile = () => {
  try {
    const data = fs.readFileSync(eventsFilePath, "utf8");
    return JSON.parse(data); // Parse JSON string to object
  } catch (err) {
    console.error("Error reading file:", err);
    return []; // Return empty array if there's an error
  }
};

// Helper function to write events to the file
const writeEventsToFile = (events) => {
  try {
    fs.writeFileSync(eventsFilePath, JSON.stringify(events, null, 2)); // Convert events to JSON and format
  } catch (err) {
    console.error("Error writing file:", err);
  }
};

// Get all events
app.get("/events", (req, res) => {
  const events = readEventsFromFile();
  res.json(events); // Send back events as JSON
});

// Add a new event
app.post("/events", (req, res) => {
  const newEvent = req.body;

  // Validate new event structure
  if (!newEvent.name || !newEvent.date) {
    return res.status(400).json({ error: "Event name and date are required" });
  }

  const events = readEventsFromFile();
  events.push(newEvent); // Add the new event to the events array
  writeEventsToFile(events); // Save the updated events array back to the file

  res.status(201).json(newEvent); // Respond with the newly created event
});

// Serve static files (if needed for deployment)
app.use(express.static(path.join(__dirname, "public")));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
