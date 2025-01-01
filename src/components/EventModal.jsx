import React, { useState, useEffect } from "react";

const EventModal = ({ selectedDate, events, onSave, onClose, eventToEdit }) => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("others"); // Default category
  const [startTime, setStartTime] = useState(""); // New state for start time
  const [endTime, setEndTime] = useState(""); // New state for end time

  useEffect(() => {
    if (eventToEdit) {
      setEventName(eventToEdit.name);
      setDescription(eventToEdit.description || "");
      setCategory(eventToEdit.category || "others"); // Use the category from eventToEdit
      setStartTime(eventToEdit.startTime || ""); // Set start time if editing
      setEndTime(eventToEdit.endTime || ""); // Set end time if editing
    }
  }, [eventToEdit]);

  const handleSave = () => {
    if (eventName) {
      if (eventToEdit) {
        // Update existing event
        onSave({
          ...eventToEdit,
          name: eventName,
          description,
          category,
          startTime,
          endTime,
        });
      } else {
        // Create new event
        onSave({
          name: eventName,
          description,
          category,
          date: selectedDate,
          startTime,
          endTime,
        });
      }
      setEventName("");
      setDescription("");
      setCategory("others"); // Reset category to default
      setStartTime(""); // Reset start time
      setEndTime(""); // Reset end time
      onClose();
    } else {
      alert("Event name is required.");
    }
  };

  const formatFullDate = (date) => {
    const d = new Date(date);
    const monthNames = [
      "January", "February", "March", "April", "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
    return `${d.getDate()} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <h2>{eventToEdit ? `Edit Event for ${formatFullDate(selectedDate)}` : `Add Event for ${formatFullDate(selectedDate)}`}</h2>
        <button className="modal-close" onClick={onClose}>
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
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)} // Handle category change
        >
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="others">Others</option>
        </select>

        {/* Add input fields for Start Time and End Time */}
        <div className="time-inputs">
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)} // Handle start time change
            placeholder="Start Time"
          />
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)} // Handle end time change
            placeholder="End Time"
          />
        </div>
      </div>
      <div className="modal-actions">
        <button className="save-btn" onClick={handleSave}>
          {eventToEdit ? "Update" : "Save"}
        </button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EventModal;
