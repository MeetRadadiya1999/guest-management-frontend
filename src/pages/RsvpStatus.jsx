
// RSVPPage.jsx - Guests accept or decline invitation
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { respondToRSVP } from "../data/guestData";
// import { respondToRSVP } from "./api";

const RSVPPage = () => {
    const { guestId } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const handleResponse = async (rsvpStatus) => {
        try {
            await respondToRSVP(guestId, rsvpStatus);
            setMessage(`RSVP status updated to: ${rsvpStatus}`);
            setTimeout(() => navigate("/"), 2000);
        } catch (error) {
            setMessage("Failed to update RSVP status.");
        }
    };

    return (
        <div>
            <h2>RSVP to Event</h2>
            {message && <p>{message}</p>}
            <button onClick={() => handleResponse("Accepted")}>Accept</button>
            <button onClick={() => handleResponse("Declined")}>Decline</button>
        </div>
    );
};

export default RSVPPage;
