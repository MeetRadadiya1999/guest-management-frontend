import { useEffect, useState } from "react";
import { getEvents, deleteEvent } from "../data/eventData";
import { Link, useNavigate } from "react-router-dom";
import { Container, Card, Button, Alert, Spinner } from "react-bootstrap";
import "./dashboard.css";

const Dashboard = ({ setToken }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    fetchEvents();
  }, [token]);

  const fetchEvents = async () => {
    try {
      const data = await getEvents(token);
      setEvents(data);
    } catch (error) {
      setMessage("Failed to load events.");
    } finally {
      setLoading(false);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <Container style={{ minWidth: "100vw", height: "100vh", alignContent: "center" }}>
      <div className="dashboard-card">
        {/* Logout Button */}
        <div className="d-flex justify-content-end mb-3">
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <Card className="p-4 shadow-lg" style={{ height: "85%", background: "#fefefe" }}>
          <h2 className="text-center">Your Events</h2>

          {message && <Alert variant="danger">{message}</Alert>}

          {loading ? (
            <div className="text-center h-100" style={{alignContent: "center"}}>
              <Spinner animation="border" variant="primary" />
            </div>
          ) : events.length === 0 ? (
            <p className="text-center">No events found.</p>
          ) : (
            <div className="event-container">
              {events.map((event) => (
                <Card key={event._id} className="event-card">
                  <Card.Body className="text-center">
                    <Card.Title>{event.name}</Card.Title>
                    <Card.Text>
                      {event.date} at {event.time}
                      <br />
                      <strong>Location:</strong> {event.location}
                    </Card.Text>
                    <div className="d-flex justify-content-center gap-2">
                      {/* View Event Button */}
                      <Link to={`/event/${event._id}`}>
                        <Button variant="primary" size="sm">View</Button>
                      </Link>

                      {/* Edit Button */}
                      <Button variant="warning" size="sm" onClick={() => navigate(`/edit-event/${event._id}`)}>Edit</Button>

                      {/* Delete Button */}
                      <Button variant="danger" size="sm" onClick={() => handleDelete(event._id)}>Delete</Button>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}

          {/* Create Event Button */}
          <div className="text-center mt-3">
            <Link to="/create-event">
              <Button variant="success">Create Event</Button>
            </Link>
          </div>
        </Card>
      </div>
    </Container>
  );
};

export default Dashboard;
