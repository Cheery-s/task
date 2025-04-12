// path: src/components/calender/CalenderView.jsx
import React,{useState} from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { FaTasks } from "react-icons/fa";
const localizer = momentLocalizer(moment);

const CalendarView = ({ tasks }) => {
    const [selectedEvent, setSelectedEvent] = useState(null); 
  const events = tasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: new Date(task.due_date),
    end: new Date(task.due_date),
    allDay: true,
    resource: task,
  }));

   // Custom event styling
   const eventStyleGetter = (event) => {
    const isCompleted = event.resource.completed;
    const style = {
      backgroundColor: isCompleted ? '#5cb85c' : '#428bca',
      borderRadius: '5px',
      color: 'white',
      border: '0px',
      display: 'block',
      opacity: 0.8,
    };
    return { style };
  };

  // Handle event selection
  const handleSelectEvent = (event) => {
    setSelectedEvent(event.resource);
  };

  // Close event details modal
  const closeEventDetails = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="calendar-container">
      <h2>Task Calendar</h2>
      <div className="calendar-wrapper">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
          views={['month', 'week', 'day', 'agenda']}
          defaultView="month"
        />
      </div>
      
      {selectedEvent && (
        <div className="event-details-modal">
          <div className="event-details-content">
            <h3>{selectedEvent.title}</h3>
            <p className="event-category">{selectedEvent.category}</p>
            <p className="event-description">{selectedEvent.description}</p>
            <p className="event-status">
              Status: {selectedEvent.completed ? 'Completed' : 'Pending'}
            </p>
            <p className="event-due-date">
              Due: {new Date(selectedEvent.due_date).toLocaleDateString()}
            </p>
            <button onClick={closeEventDetails} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}
      
      <div className="calendar-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#428bca' }}></span>
          <span>Pending</span>
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#5cb85c' }}></span>
          <span>Completed <FaTasks/></span>
        </div>

        </div>
    </div>
    );
}

export default CalendarView;