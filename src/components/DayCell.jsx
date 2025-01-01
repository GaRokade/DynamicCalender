const DayCell = ({ day, isToday, isSelected, events, onClick, onDelete }) => {
    const handleDeleteClick = (eventId) => {
      if (onDelete) {
        onDelete(eventId); // Call onDelete when the delete button is clicked
      } else {
        console.error('onDelete function is not passed!');
      }
    };
  
    return (
      <div className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`} onClick={onClick}>
        {day}
        {events.length > 0 && (
          <>
            <span className="event-dot" />
            {events.map((event) => (
              <div key={event.id}>
                <span>{event.title}</span>
                <button onClick={() => handleDeleteClick(event.id)}>Delete</button>
              </div>
            ))}
          </>
        )}
      </div>
    );
  };
  
  export default DayCell;
  