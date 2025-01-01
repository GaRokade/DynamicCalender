import { useDrag } from "react-dnd";

const Event = ({ event, index, onMoveEvent }) => {
  const [, drag] = useDrag({
    type: "EVENT",
    item: { index, event },
  });

  return (
    <div ref={drag} className="event-item">
      <strong>{event.name}</strong>
      <p>{event.description}</p>
    </div>
  );
};

export default Event;
