import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvents } from "../data/eventData";
import GuestInvitationForm from "./GuestInvitationForm"; // Import the component

const EventDetails = () => {
  const { id } = useParams();
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
      console.log(selectedEvent.guests, "event guest")

    } catch (err) {
      setError("Failed to load event details.");
    }
  };

  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!event) return <p>Loading event details...</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h2>{event.name}</h2>
      <p>{event.date} at {event.time}</p>
      <p>Location: {event.location}</p>

      <h3>Guest List</h3>
      {event.guests.length > 0 ? (
        <ul>
          {event.guests.map((guest) => (
            <li key={guest._id}>
              Email - {guest.email}
              Status - {guest.rsvpStatus}
            </li>
          ))}
        </ul>
      ) : (
        <p>No guests invited yet.</p>
      )}

      {/* Guest Invitation Form */}
      <GuestInvitationForm eventId={event._id} token={token} />
    </div>
  );
};

export default EventDetails;
