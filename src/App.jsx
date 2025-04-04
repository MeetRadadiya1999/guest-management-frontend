import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import CreateEvent from "./pages/CreateEvent";
import Dashboard from "./pages/Dashboard";
import EditEvent from "./pages/EditEvent";
import { useState, useEffect } from "react";
import RSVPPage from "./pages/RsvpStatus";
import EventDetails from "./components/EventDetails";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={!token ? <AuthForm setToken={setToken} /> : <Navigate to="/dashboard" />} />
        <Route path="/create-event" element={token ? <CreateEvent /> : <Navigate to="/" />} />
        <Route path="/dashboard" element={token ? <Dashboard setToken={setToken} /> : <Navigate to="/" />} />
        <Route path="/event/:id" element={token ? <EventDetails /> : <Navigate to="/" />} />
        <Route path="/edit-event/:id" element={token ? <EditEvent /> : <Navigate to="/" />} />
        <Route path="/rsvp/:guestId" element={<RSVPPage />} />
      </Routes>
    </Router>
  );
};

export default App;
