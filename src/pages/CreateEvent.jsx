import { useState } from "react";
import { createEvent } from "../data/eventData";
import { Link } from "react-router-dom";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
  });

  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token"); // Get token from localStorage

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setMessage("User not authenticated. Please log in.");
      return;
    }
    try {
      const response = await createEvent(eventData, token);
      setMessage(response.message);
      setEventData({ name: "", date: "", time: "", location: "" }); // Clear form
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create event.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", textAlign: "center" }}>
         <div>
                <Link to="/dashboard">
                    <button style={{ background: "green", color: "white", padding: "8px 12px", border: "none", cursor: "pointer" }}>
                      Dashboard
                    </button>
                </Link>
            </div>
      <h2>Create Event</h2>
      
      {message && <p style={{ color: "red" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Event Name" value={eventData.name} onChange={handleChange} required />
        <input type="date" name="date" value={eventData.date} onChange={handleChange} required />
        <input type="time" name="time" value={eventData.time} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={eventData.location} onChange={handleChange} required />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;
