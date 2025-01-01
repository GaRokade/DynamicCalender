import React, { useState } from "react";
import PropTypes from "prop-types";

const EventList = ({ events, renderDate, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter events based on the search query
  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (event.description &&
        event.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="event-list-container">
      <h2>Saved Events</h2>
      <input
        type="text"
        placeholder="Search events..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      {filteredEvents.length === 0 ? (
        <p>No events found</p>
      ) : (
        <ul>
          {filteredEvents.map((event, index) => (
            <li key={event.id || index}>
              <strong>{event.name}</strong>
              <br />
              <span>Date: {renderDate(new Date(event.date))}</span>
              <br />
              <span className="description">
                Description: {event.description || "No description"}
              </span>
              <br />
              <span className="time">
                Time: {event.startTime} - {event.endTime}
              </span>
              <br />
              <button
                className="delete-btn"
                onClick={() => onDelete(event.id)} // Pass the event id to onDelete
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// PropTypes validation
EventList.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string,
      startTime: PropTypes.string.isRequired, // New prop for start time
      endTime: PropTypes.string.isRequired,   // New prop for end time
    })
  ).isRequired,
  renderDate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired, // Ensure onDelete is a function
};

export default EventList;
EventList.propTypes = {
    events: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Accept both string and number
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        description: PropTypes.string,
        startTime: PropTypes.string.isRequired,
        endTime: PropTypes.string.isRequired,
      })
    ).isRequired,
    renderDate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
  };
  