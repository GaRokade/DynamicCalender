const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 5000;

// Enable CORS for all requests
app.use(cors());

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// File path to store events
const eventsFilePath = path.join(__dirname, "events.json");

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
