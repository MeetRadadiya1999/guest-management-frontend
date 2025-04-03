import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import CreateEvent from "./pages/createEvent";
import Dashboard from "./pages/Dashboard";
import EditEvent from "./pages/EditEvent";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={!token ? <AuthForm /> : <Navigate to="/dashboard" />} />
        <Route path="/create-event" element={token ? <CreateEvent /> : <Navigate to="/" />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/edit-event/:id" element={token ? <EditEvent /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
