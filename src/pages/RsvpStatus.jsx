import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGuestDetails, respondToRSVP } from "../data/guestData"; // Import API calls

const RSVPPage = () => {
    const { guestId } = useParams();
    const [event, setEvent] = useState(null);
    const [rsvpStatus, setRsvpStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchGuestDetails = async () => {
            try {
                const data = await getGuestDetails(guestId);
                setEvent(data.event);
                setRsvpStatus(data.rsvpStatus); // "Pending", "Accepted", or "Declined"
                setLoading(false);
            } catch (error) {
                setMessage("Failed to fetch event details.");
                setLoading(false);
            }
        };
        fetchGuestDetails();
    }, [guestId]);

    const handleResponse = async (status) => {
        try {
            await respondToRSVP(guestId, status);
            setRsvpStatus(status); // Update status immediately
            setMessage(`RSVP status updated to: ${status}`);
        } catch (error) {
            setMessage("Failed to update RSVP status.");
        }
    };

    if (loading) return <p>Loading event details...</p>;
    if (!event) return <p>Event not found.</p>;

    return (
        <div>
            <h2>{event.name}</h2>
            <p>📅 Date: {event.date}</p>
            <p>⏰ Time: {event.time}</p>
            <p>📍 Location: {event.location}</p>
            <p>👤 Hosted by: {event.inviter} ({event.inviterEmail})</p>

            {rsvpStatus === "Pending" ? (
                <div>
                    <button onClick={() => handleResponse("Accepted")}>Accept</button>
                    <button onClick={() => handleResponse("Declined")}>Decline</button>
                </div>
            ) : (
                <p>✅ Your RSVP Status: {rsvpStatus}</p>
            )}

            {message && <p>{message}</p>}
        </div>
    );
};

export default RSVPPage;
