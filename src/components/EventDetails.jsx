import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEvents } from "../data/eventData";
import GuestInvitationForm from "./GuestInvitationForm";
import { Container, Card, ListGroup, Alert, Spinner, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const data = await getEvents(token);
      const selectedEvent = data.find((event) => event._id === id);
      if (!selectedEvent) {
        setError("Event not found.");
        return;
      }
      setEvent(selectedEvent);
    } catch (err) {
      setError("Failed to load event details.");
    }
  };

  if (error) return <Alert variant="danger" className="text-center">{error}</Alert>;
  if (!event) return <Spinner animation="border" className="d-block mx-auto mt-5" />;

  return (
    <Container className="" style={{ minWidth: "100vw" }}>
    

      <Card className=" shadow-lg text-center" style={{ width: "50%", margin: "0 auto", padding: "4em 1em 1em 1em" }}>

          {/* Back Button */}
      <Button
        variant="secondary"
        onClick={() => navigate(-1)}
        className="mb-3 d-flex align-items-center"
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          display: "flex",
          alignItems: "center",
          gap: "5px",
          fontSize: "16px",
        }}
      >
        <FaArrowLeft /> Back
      </Button>

        <h4 style={{ background: "green", color: "white", padding: "5px", borderRadius: "8px", width: "50%", margin: "auto" }}>
         Event : {event.name}
        </h4>
        <p className="text-muted m-1"><strong>Date : </strong>{event.date} at {event.time}</p>
        <p className="m-1"><strong>Location :</strong> {event.location}</p>

        <h4 className="" style={{ color: "#007bff" }}>Guest List</h4>
        {event.guests.length > 0 ? (
          <ListGroup className="mt-2" style={{ maxHeight: "200px", overflowY: "auto" }}>
            {event.guests.map((guest) => (
              <ListGroup.Item key={guest._id} className="d-flex justify-content-between">
                <span>Email: <strong>{guest.email}</strong></span>
                <span>Status: <strong>{guest.rsvpStatus}</strong></span>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <Alert variant="info" className="mt-2">No guests invited yet.</Alert>
        )}

        {/* Guest Invitation Form */}
        <div className="mt-2">
          <GuestInvitationForm eventId={event._id} token={token} />
        </div>
      </Card>
    </Container>
  );
};

export default EventDetails;
