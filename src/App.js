import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Calendar from "./components/Calendar";
import EventModal from "./components/EventModal";
import EventList from "./components/EventList";
import PropTypes from "prop-types";
import "./styles.css";

const apiUrl = process.env.REACT_APP_API_URL; // Ensure this is defined in your .env file

const App = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const exportToJSON = () => {
    const eventsForMonth = events.filter((event) => {
      const eventMonth = event.date.getMonth(); // Get month from event date
      const eventYear = event.date.getFullYear(); // Get year from event date
      return eventMonth === currentMonth && eventYear === currentYear; // Filter by current month and year
    });

    // Convert to JSON format
    const json = JSON.stringify(eventsForMonth, null, 2); // Pretty-print JSON
    const blob = new Blob([json], { type: "application/json" }); // Create Blob
    const url = URL.createObjectURL(blob); // Create download link

    // Create a temporary download link and trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = `events-${currentMonth + 1}-${currentYear}.json`; // Download file with month-year name
    link.click();
  };

  const exportToCSV = () => {
    const eventsForMonth = events.filter((event) => {
      const eventMonth = event.date.getMonth();
      const eventYear = event.date.getFullYear();
      return eventMonth === currentMonth && eventYear === currentYear;
    });

    // Prepare CSV data: header + rows
    const header = "Name,Description,Date\n";
    const rows = eventsForMonth
      .map(
        (event) =>
          `${event.name},${event.description || ""},${event.date.toISOString()}`
      )
      .join("\n");

    const csvContent = header + rows;
    const blob = new Blob([csvContent], { type: "text/csv" }); // Create Blob for CSV
    const url = URL.createObjectURL(blob);

    // Create a temporary download link and trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = `events-${currentMonth + 1}-${currentYear}.csv`; // File name with month-year
    link.click();
  };

  const handleMonthChange = (newMonth, newYear) => {
    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  // Fetch events
  useEffect(() => {
    setLoading(true);
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response); // Log the entire response object
        if (Array.isArray(response.data)) {
          const eventsWithDates = response.data.map((event, index) => ({
            ...event,
            date: new Date(event.date),
            id: event.id || index, // Add fallback unique ID
          }));
          setEvents(eventsWithDates);
        } else {
          setError("API response is not an array.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading events:", error);
        setError("Error loading events");
        setLoading(false);
      });
  }, []);

  // Add event
  const addEvent = (newEvent) => {
    const eventWithDate = {
      ...newEvent,
      date: new Date(newEvent.date),
      id: newEvent.id || Date.now(), // Generate unique ID
    };

    axios
      .post(apiUrl, eventWithDate)
      .then(() => {
        setEvents((prev) => [...prev, eventWithDate]);
      })
      .catch((error) => {
        console.error("Error saving event:", error);
        alert("Failed to save event.");
      });
  };

  const formatDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      return date.toISOString().split("T")[0];
    }
    return "";
  };

  const renderDate = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      return date.toLocaleDateString();
    }
    return "";
  };

  const handleDelete = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== eventId)
    );
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <div>
          <nav>
            <Link to="/">Calendar</Link> |{" "}
            <Link to="/events">Saved Events</Link>
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
                    currentMonth={currentMonth}
                    currentYear={currentYear}
                    onMonthChange={handleMonthChange} // Pass month change handler
                    exportToCSV={exportToCSV}
                    exportToJSON={exportToJSON}
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
              element={
                <EventList
                  events={events}
                  renderDate={renderDate}
                  onDelete={handleDelete}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </DndProvider>
  );
};

App.propTypes = {
  events: PropTypes.array.isRequired,
};

export default App;
