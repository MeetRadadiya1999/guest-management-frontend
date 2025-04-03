
// GuestInvitationForm.jsx - Invite guests
import { useState } from "react";
import { inviteGuest } from "../data/guestData";
// import { inviteGuest } from "./api";

const GuestInvitationForm = ({ eventId, token }) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleInvite = async (e) => {
        e.preventDefault();
        try {
            await inviteGuest(eventId, email, token);
            setMessage("Invitation sent successfully!");
            setEmail("");
            window.location.reload(); // 🔥 Refresh the page to show updated guest list
        } catch (error) {
            setMessage("Failed to send invitation.");
        }
    };

    return (
        <div>
            <h2>Invite a Guest</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleInvite}>
                <input type="email" placeholder="Enter guest email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">Send Invitation</button>
            </form>
        </div>
    );
};

export default GuestInvitationForm;
