import { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../data/eventData";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents(token);
      setEvents(data);
    } catch (error) {
      setMessage("Failed to load events.");
    }
  };

  const handleDelete = async (eventId) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(eventId, token);
        setEvents(events.filter((event) => event._id !== eventId));
      } catch (error) {
        setMessage("Failed to delete event.");
      }
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h2>Your Events</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      {events.length === 0 ? (
        <p>No events found. Create one!</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event._id} style={{ marginBottom: "10px", borderBottom: "1px solid #ccc", padding: "10px" }}>
              <h3>{event.name}</h3>
              <p>{event.date} at {event.time}</p>
              <p>Location: {event.location}</p>
              <button onClick={() => navigate(`/edit-event/${event._id}`)}>Edit</button>
              <button onClick={() => handleDelete(event._id)} style={{ marginLeft: "10px", color: "red" }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
