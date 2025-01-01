import React from "react";

const EventList = ({ events, renderDate }) => {
  return (
    <div className="event-list-container">
  <h2>Saved Events</h2>
  {events.length === 0 ? (
    <p>No events found</p>
  ) : (
    <ul>
      {events.map((event, index) => (
        <li key={index}>
          <strong>{event.name}</strong>
          <span>Date: {renderDate(new Date(event.date))}</span>
          
          <span className="description">
            Description: {event.description || "No description"}
          </span>
        </li>
      ))}
    </ul>
  )}
</div>

  );
};

export default EventList;
