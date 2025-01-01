import React, { useState } from "react";

const Calendar = ({ events, onDayClick, formatDate }) => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null); // State to track selected date

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

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

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
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

  const handleDayClick = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    setSelectedDate(date); // Update selected date
    onDayClick(date); // Pass selected date to parent
  };

  const getDayEvents = (day) => {
    const date = new Date(currentYear, currentMonth, day);
    return events.filter((event) => formatDate(event.date) === formatDate(date));
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>Previous</button>
        <h2>
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div className="calendar-grid">
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`empty-${i}`} className="calendar-day empty" />
        ))}
        {days.map((day) => (
          <div
            key={day}
            className={`calendar-day ${
              isToday(day) ? "current" : ""
            } ${isSelected(day) ? "selected" : ""}`}
            onClick={() => handleDayClick(day)}
          >
            {day}
            {getDayEvents(day).length > 0 && <span className="event-dot" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
