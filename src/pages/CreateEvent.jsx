import { useState } from "react";
import { createEvent } from "../data/eventData";
import { Link } from "react-router-dom";
import { Card, Button, Form, Alert, Container } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs"; // Back icon

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
    <Container className="d-flex justify-content-center mt-5" style={{minWidth: "100vw"}}>
      <Card style={{ width: "50%", padding: "20px" }} className="shadow-lg">
        
        {/* Back to Dashboard Button */}
        <Link to="/dashboard" className="mb-3">
          <Button variant="outline-secondary">
            <BsArrowLeft /> Back to Dashboard
          </Button>
        </Link>

        <h3 className="text-center text-primary">Create Event</h3>

        {message && <Alert variant={message.includes("Failed") ? "danger" : "success"}>{message}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Event Name</Form.Label>
            <Form.Control 
              type="text" 
              name="name" 
              placeholder="Enter event name" 
              value={eventData.name} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control 
              type="date" 
              name="date" 
              value={eventData.date} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control 
              type="time" 
              name="time" 
              value={eventData.time} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control 
              type="text" 
              name="location" 
              placeholder="Enter location" 
              value={eventData.location} 
              onChange={handleChange} 
              required 
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            🎉 Create Event
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default CreateEvent;
