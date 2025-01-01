import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Calendar from "./components/Calendar";
import EventModal from "./components/EventModal";
import EventList from "./components/EventList";
import "./styles.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((response) => {
        const eventsWithDates = response.data.map((event) => ({
          ...event,
          date: new Date(event.date), // Ensure the date is a valid Date object
        }));
        setEvents(eventsWithDates);
      })
      .catch((error) => {
        console.error("Error loading events:", error);
        alert("Failed to load events.");
      });
  }, []);

  const addEvent = (newEvent) => {
    const eventWithDate = {
      ...newEvent,
      date: new Date(newEvent.date), // Ensure date is a Date object
    };
    axios
      .post("http://localhost:5000/events", eventWithDate)
      .then(() => {
        setEvents((prev) => [...prev, eventWithDate]);
      })
      .catch((error) => {
        console.error("Error saving event:", error);
        alert("Failed to save event.");
      });
  };

  // Format the date to be used for event matching
  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      return date.toISOString().split("T")[0]; // Format to YYYY-MM-DD
    }
    return ""; // Return empty string if invalid date
  };

  // Function to render date as a string
  const renderDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      return date.toLocaleDateString(); // Or use toISOString() or toString() for different formats
    }
    return "";
  };

  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Calendar</Link> | <Link to="/events">Saved Events</Link>
        </nav>

        <Routes>
          <Route
            exact
            path="/"
            element={
              <div>
                <Calendar
                  events={events}
                  onDayClick={(date) => setSelectedDate(date)}
                  formatDate={formatDate}
                />
                {selectedDate && (
                  <EventModal
                    selectedDate={selectedDate}
                    events={events.filter(
                      (event) =>
                        formatDate(event.date) === formatDate(selectedDate)
                    )}
                    onSave={addEvent}
                    onClose={() => setSelectedDate(null)}
                  />
                )}
              </div>
            }
          />
          <Route
            path="/events"
            element={<EventList events={events} renderDate={renderDate} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
