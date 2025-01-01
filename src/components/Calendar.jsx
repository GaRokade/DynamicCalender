import React, { useState } from "react";

const Calendar = ({ events, onDayClick, formatDate, onEventEdit, currentMonth, currentYear, exportToCSV, exportToJSON }) => {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(null);
  
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
    const monthNames = [
      "January", "February", "March", "April", "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
  
    const handlePrevMonth = () => {
      if (currentMonth === 0) {
        onMonthChange(11, currentYear - 1); // Move to previous year
      } else {
        onMonthChange(currentMonth - 1, currentYear);
      }
    };
  
    const handleNextMonth = () => {
      if (currentMonth === 11) {
        onMonthChange(0, currentYear + 1); // Move to next year
      } else {
        onMonthChange(currentMonth + 1, currentYear);
      }
    };
  
    const onMonthChange = (newMonth, newYear) => {
      // Update month and year in the parent component (via props or state update)
      // Use a function from parent to update `currentMonth` and `currentYear`
      // Example: pass this function as a prop from App.js to update month/year
    };
  
    const isToday = (day) => {
      return (
        day === today.getDate() &&
        currentMonth === today.getMonth() &&
        currentYear === today.getFullYear()
      );
    };
  
    const isSelected = (day) => {
      return (
        selectedDate &&
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === currentMonth &&
        selectedDate.getFullYear() === currentYear
      );
    };
  
    // Helper function to determine event class based on category
    const getEventClass = (category) => {
      switch (category) {
        case "work":
          return "event-work";
        case "personal":
          return "event-personal";
        case "others":
          return "event-others";
        default:
          return "";
      }
    };
  
    const handleDayClick = (day) => {
      const date = new Date(currentYear, currentMonth, day);
      setSelectedDate(date);
      onDayClick(date);
    };
  
    const getDayEvents = (day) => {
      const date = new Date(currentYear, currentMonth, day);
      return events.filter(event => formatDate(event.date) === formatDate(date));
    };
  
    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={handlePrevMonth}>Previous</button>
          <h2>{monthNames[currentMonth]} {currentYear}</h2>
          <button onClick={handleNextMonth}>Next</button>
        </div>
        <div className="calendar-grid">
          {Array.from({ length: firstDay }, (_, i) => (
            <div key={`empty-${i}`} className="calendar-day empty" />
          ))}
          {days.map((day) => (
            <div
              key={day}
              className={`calendar-day ${isToday(day) ? "current" : ""} ${isSelected(day) ? "selected" : ""}`}
              onClick={() => handleDayClick(day)}
            >
              {day}
              {getDayEvents(day).map((event) => (
                <div
                  key={event.id}
                  className={`event-dot ${getEventClass(event.category)}`}
                  onClick={() => onEventEdit(event)}
                />
              ))}
            </div>
          ))}
        </div>
        <div>
          <button onClick={exportToJSON}>Export as JSON</button>
          <button onClick={exportToCSV}>Export as CSV</button>
        </div>
      </div>
    );
  };
  

export default Calendar;
