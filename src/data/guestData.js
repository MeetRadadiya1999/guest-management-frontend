// guestData.js - Handles API calls
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Invite a guest
export const inviteGuest = async (eventId, email, token) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/guests/invite/${eventId}`, { email }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error inviting guest:", error.response?.data?.message || error.message);
        throw error;
    }
};

// Respond to an RSVP
export const respondToRSVP = async (guestId, rsvpStatus) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/guests/rsvp/${guestId}`, { rsvpStatus });
        return response.data;
    } catch (error) {
        console.error("Error responding to RSVP:", error.response?.data?.message || error.message);
        throw error;
    }
};

// Fetch guests for an event
// export const getGuests = async (eventId, token) => {
//     try {
//         const response = await axios.get(`${API_BASE_URL}/guests/${eventId}`, {
//             headers: { Authorization: `Bearer ${token}` },
//         });
//         return response.data;
//     } catch (error) {
//         console.error("Error fetching guests:", error.response?.data?.message || error.message);
//         throw error;
//     }
// };


// Fetch guest & event details
export const getGuestDetails = async (guestId) => {
    const res = await axios.get(`${API_BASE_URL}/guests/${guestId}`);
    return res.data;
};

