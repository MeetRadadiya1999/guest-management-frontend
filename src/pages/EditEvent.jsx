import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateEvent, getEvents } from "../data/eventData";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    loadEvent();
  }, []);

  const loadEvent = async () => {
    try {
      const events = await getEvents(token);
      const event = events.find((e) => e._id === id);
      if (event) {
        setEventData(event);
      } else {
        setMessage("Event not found.");
      }
    } catch (error) {
      setMessage("Failed to load event.");
    }
  };

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEvent(id, eventData, token);
      navigate("/dashboard");
    } catch (error) {
      setMessage("Failed to update event.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
      <h2>Edit Event</h2>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Event Name" value={eventData.name} onChange={handleChange} required />
        <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
        <input type="time" name="time" value={eventData.time} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={eventData.location} onChange={handleChange} required />
        <button type="submit">Update Event</button>
      </form>
    </div>
  );
};

export default EditEvent;
