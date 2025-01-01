import React, { useState } from "react";

const EventModal = ({ selectedDate, events, onSave, onClose }) => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (eventName) {
      onSave({
        name: eventName,
        description,
        date: selectedDate,
      });
      setEventName("");
      setDescription("");
      onClose();
    } else {
      alert("Event name is required.");
    }
  };

  const formatFullDate = (date) => {
    const d = new Date(date);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <h2>Add Event for {formatFullDate(selectedDate)}</h2>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="modal-content">
        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="modal-actions">
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EventModal;
