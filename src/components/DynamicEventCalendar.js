import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const DynamicEventCalendar = ({ events, setEvents }) => {
  const renderEventsForDate = (date) => {
    return events
      .filter((event) => event.date === date)
      .map((event, index) => (
        <Draggable key={event.id} draggableId={event.id} index={index}>
          {(provided) => (
            <div
              className="event"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <p>{event.name}</p>
              <p>{event.description}</p>
            </div>
          )}
        </Draggable>
      ));
  };

  return (
    <div className="calendar">
      {/* Day 1 */}
      <Droppable droppableId="2025-01-02">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="day"
          >
            <h3>2025-01-02</h3>
            {renderEventsForDate("2025-01-02")}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* Day 2 */}
      <Droppable droppableId="2025-01-03">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="day"
          >
            <h3>2025-01-03</h3>
            {renderEventsForDate("2025-01-03")}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DynamicEventCalendar;
