import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Create Event API Call
export const createEvent = async (eventData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/events/create`, eventData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error.response?.data?.message || error.message);
    throw error;
  }
};





// Fetch all events for the logged-in user
export const getEvents = async (token) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/events`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error.response?.data?.message || error.message);
      throw error;
    }
  };
  
  // Update an event
  export const updateEvent = async (eventId, eventData, token) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/events/${eventId}`, eventData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating event:", error.response?.data?.message || error.message);
      throw error;
    }
  };
  
  // Delete an event
  export const deleteEvent = async (eventId, token) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting event:", error.response?.data?.message || error.message);
      throw error;
    }
  };