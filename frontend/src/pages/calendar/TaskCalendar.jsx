import React, { useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { getTasks } from "../../api/task_api";
import { useNavigate } from "react-router-dom";
import "./TaskCalendar.css";

const TaskCalendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await getTasks({ limit: 1000 });
        const tasks = res.data.tasks;

        const formatted = tasks
          .filter((t) => t.dueDate)
          .map((t) => ({
            id: t._id,
            title: t.title,
            date: t.dueDate.slice(0, 10),
            extendedProps: {
              status: t.status,
              assignedTo: t.assignedTo?.username,
              createdBy: t.createdBy?.username,
            },
            backgroundColor:
              t.status === "Completed"
                ? "#28a745"
                : t.status === "In Progress"
                ? "#ffc107"
                : "#6c757d",
            borderColor:
              t.status === "Completed"
                ? "#1e7e34"
                : t.status === "In Progress"
                ? "#e0a800"
                : "#5a6268",
          }));

        setEvents(formatted);
      } catch (err) {
        console.log("Calendar load error:", err.response);
      }
    };

    loadTasks();
  }, []);

  const handleDateClick = (info) => {
    const dayTasks = events.filter((e) => e.date === info.dateStr);
    setSelectedTasks(dayTasks);
    setSelectedDate(info.dateStr);
    setShowModal(true);
  };

  const handleEventClick = (info) => {
    navigate(`/tasks/edit/${info.event.id}`);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Format date for display
  const formatDate = (dateStr) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>Task Calendar</h2>
      </div>

      <div className="calendar-wrapper">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          height="80vh"
          eventDisplay="block"
          dayMaxEventRows={3}
        />
      </div>

      {/* Modal for selected date tasks */}
      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Tasks for {formatDate(selectedDate)}</h3>
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              {selectedTasks.length === 0 ? (
                <p className="no-tasks">No tasks for this date.</p>
              ) : (
                <ul className="task-list">
                  {selectedTasks.map((t) => (
                    <li 
                      key={t.id} 
                      className={`task-item ${t.extendedProps.status.toLowerCase().replace(' ', '-')}`}
                      onClick={() => navigate(`/tasks/edit/${t.id}`)}
                    >
                      <div className="task-title">{t.title}</div>
                      <div className="task-status">Status: {t.extendedProps.status}</div>
                      {t.extendedProps.assignedTo && (
                        <div className="task-status">Assigned to: {t.extendedProps.assignedTo}</div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="modal-footer">
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCalendar;