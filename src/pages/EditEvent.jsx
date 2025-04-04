import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateEvent, getEvents } from "../data/eventData";
import { Form, Button, Container, Alert, Card } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs"; // Back icon


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
    <Container className="d-flex justify-content-center align-items-center vh-100" style={{minWidth : "100vw"}}>
      <Card className="shadow-lg" style={{ maxWidth: "500px", width: "100%", padding: "4em 1em 1em 1em" }}>
        <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3" style={{width : "", margin: "", position: "absolute", left: "5%", top: "5%"}}>
          <BsArrowLeft /> Back
        </Button>
        <h2 className="text-center">Edit Event</h2>
        {message && <Alert variant="danger">{message}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Event Name</Form.Label>
            <Form.Control type="text" name="name" value={eventData.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control type="date" name="date" value={eventData.date} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Time</Form.Label>
            <Form.Control type="time" name="time" value={eventData.time} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control type="text" name="location" value={eventData.location} onChange={handleChange} required />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">Update Event</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default EditEvent;
