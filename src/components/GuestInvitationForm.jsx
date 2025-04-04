import { useState } from "react";
import { inviteGuest } from "../data/guestData";

const GuestInvitationForm = ({ eventId, token }) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleInvite = async (e) => {
        e.preventDefault();
        try {
            await inviteGuest(eventId, email, token);
            setMessage("✅ Invitation sent successfully!");
            setEmail("");
            window.location.reload(); // 🔥 Refresh the page to show updated guest list
        } catch (error) {
            setMessage("❌ Failed to send invitation.");
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "20px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px", background: "#f9f9f9", maxWidth: "400px", marginInline: "auto" }}>
            <h4 style={{ color: "#007bff", marginBottom: "10px" }}>Invite a Guest</h4>
            {message && <p style={{ color: message.includes("✅") ? "green" : "red", fontWeight: "bold" }}>{message}</p>}
            
            <form onSubmit={handleInvite} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input 
                    type="email" 
                    placeholder="Enter guest email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        width: "100%",
                        fontSize: "16px"
                    }}
                />
                <button 
                    type="submit"
                    style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "none",
                        background: "#007bff",
                        color: "white",
                        fontSize: "16px",
                        cursor: "pointer"
                    }}
                >
                    Send Invitation
                </button>
            </form>
        </div>
    );
};

export default GuestInvitationForm;
