import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGuestDetails, respondToRSVP } from "../data/guestData"; 
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
import "./rsvpstatus.css";

const RSVPPage = () => {
    const { guestId } = useParams();
    const [event, setEvent] = useState(null);
    const [rsvpStatus, setRsvpStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rsvpLoading, setRsvpLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchGuestDetails = async () => {
            try {
                const data = await getGuestDetails(guestId);
                setEvent(data.event);
                setRsvpStatus(data.rsvpStatus); 
            } catch (error) {
                setMessage("Failed to fetch event details.");
            } finally {
                setLoading(false);
            }
        };
        fetchGuestDetails();
    }, [guestId]);

    const handleResponse = async (status) => {
        setRsvpLoading(true);
        try {
            await respondToRSVP(guestId, status);
            setRsvpStatus(status);
            setMessage(`RSVP status updated to: ${status}`);
        } catch (error) {
            setMessage("Failed to update RSVP status.");
        } finally {
            setRsvpLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100" style={{ minWidth: "100vw" }}>
            <Card className="p-4 shadow-lg text-center rsvp-card">
                <h2 className="mb-3">Invitation</h2>
                {loading ? (
                    <div className="d-flex justify-content-center" style={{margin : "auto"}}>
                        <Spinner animation="border" />
                    </div>
                ) : event ? (
                    <>
                        <h2 className="mb-3">Event: {event.name}</h2>
                        <p>📅 <strong>Date:</strong> {event.date}</p>
                        <p>⏰ <strong>Time:</strong> {event.time}</p>
                        <p>📍 <strong>Location:</strong> {event.location}</p>
                        <p>👤 <strong>Hosted by:</strong> {event.inviter} ({event.inviterEmail})</p>

                        {rsvpStatus === "Pending" ? (
                            <div className="d-flex justify-content-center gap-3 mt-3">
                                <Button variant="success" onClick={() => handleResponse("Accepted")} disabled={rsvpLoading}>
                                    {rsvpLoading ? <Spinner animation="border" size="sm" /> : "Accept"}
                                </Button>
                                <Button variant="danger" onClick={() => handleResponse("Declined")} disabled={rsvpLoading}>
                                    {rsvpLoading ? <Spinner animation="border" size="sm" /> : "Decline"}
                                </Button>
                            </div>
                        ) : (
                            <Alert variant="info" className="mt-3">✅ Your RSVP Status: <strong>{rsvpStatus}</strong></Alert>
                        )}

                        {message && <Alert variant="secondary" className="mt-3">{message}</Alert>}
                    </>
                ) : (
                    <Alert variant="danger">Event not found.</Alert>
                )}
            </Card>
        </Container>
    );
};

export default RSVPPage;
