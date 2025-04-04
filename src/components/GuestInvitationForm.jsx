import { useState } from "react";
import { inviteGuest } from "../data/guestData";
import { Spinner } from "react-bootstrap";

const GuestInvitationForm = ({ eventId, token }) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInvite = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage(""); // Clear previous messages

        try {
            await inviteGuest(eventId, email, token);
            setMessage("✅ Invitation sent successfully!");
            setEmail("");
            window.location.reload(); // 🔥 Refresh to update the guest list
        } catch (error) {
            setMessage("❌ Failed to send invitation.");
        } finally {
            setLoading(false);
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
                    disabled={loading}
                    style={{
                        padding: "10px",
                        borderRadius: "5px",
                        border: "none",
                        background: loading ? "#6c757d" : "#007bff",
                        color: "white",
                        fontSize: "16px",
                        cursor: loading ? "not-allowed" : "pointer",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px"
                    }}
                >
                    {loading ? (
                        <>
                            <Spinner animation="border" size="sm" /> Sending...
                        </>
                    ) : (
                        "Send Invitation"
                    )}
                </button>
            </form>
        </div>
    );
};

export default GuestInvitationForm;
