import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import AuthForm from "./pages/AuthForm";
import CreateEvent from "./pages/CreateEvent";
import Dashboard from "./pages/Dashboard";
import EditEvent from "./pages/EditEvent";
import RSVPPage from "./pages/RsvpStatus";
import EventDetails from "./components/EventDetails";
import ProtectedRoute from "./components/ProtectedRoute";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showModal, setShowModal] = useState(false); // 🔘 Modal state

  // 🔐 Token Expiration Check
  useEffect(() => {
    const checkTokenExpiration = () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken) {
        try {
          const decoded = jwtDecode(storedToken);
          const currentTime = Date.now() / 1000;

          if (decoded.exp < currentTime) {
            setShowModal(true); // Show modal instead of alert
          }
        } catch (error) {
          localStorage.removeItem("token");
          setToken(null);
        }
      }
    };

    checkTokenExpiration(); // Run once on load

    const interval = setInterval(checkTokenExpiration, 60000); // Every 1 min

    return () => clearInterval(interval);
  }, []);

  // 🔁 Sync across tabs
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 👇 Handle Modal Close
  const handleModalClose = () => {
    localStorage.removeItem("token");
    setToken(null);
    setShowModal(false);
  };

  return (
    <>
    
    <Router>
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={!token ? <AuthForm setToken={setToken} /> : <Navigate to="/dashboard" />} />
    <Route path="/rsvp/:guestId" element={<RSVPPage />} />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute token={token} />}>
      <Route path="/dashboard" element={<Dashboard setToken={setToken} token={token} />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/event/:id" element={<EventDetails />} />
      <Route path="/edit-event/:id" element={<EditEvent />} />
    </Route>
  </Routes>
</Router>


      {/* 🧊 Bootstrap Modal */}
      {showModal && (
        <>
          {/* 🔲 Backdrop */}
          <div
            className="modal-backdrop show"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 1040,
            }}
          />

          {/* 🧊 Modal Box */}
          <div
            className="modal show fade d-block"
            tabIndex="-1"
            style={{ zIndex: 1050 }}
          >
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: "400px" }}>
              <div className="modal-content" style={{ padding: "1rem" }}>
                <div className="modal-header">
                  <h5 className="modal-title">Session Expired</h5>
                </div>
                <div className="modal-body">
                  <p>Your session has expired. Please log in again.</p>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-primary" onClick={handleModalClose}>
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default App;
