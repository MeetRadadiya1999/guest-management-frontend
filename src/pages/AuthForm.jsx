import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";

const API_URL = import.meta.env.VITE_API_URL;

const AuthForm = ({ setToken }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setFormData({ name: "", email: "", password: "" }); // Reset all fields
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isSignup ? `${API_URL}/auth/register` : `${API_URL}/auth/login`;
    const requestData = isSignup
      ? formData
      : { email: formData.email, password: formData.password };

    try {
      const response = await axios.post(url, requestData);

      if (isSignup) {
        alert("Sign-up successful! Please log in.");
        setIsSignup(false); // Switch to sign-in form after sign-up
        setFormData({ name: "", email: "", password: "" }); // Clear input fields
      } else {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        // alert("Authentication successful!");
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh", minWidth: "100vw" }}>
      <Card className="p-4 shadow-lg" style={{ width: "100%", maxWidth: "400px" }}>
        <Card.Body>
          <h2 className="text-center">{isSignup ? "Sign Up" : "Sign In"}</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            {isSignup && (
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
          </Form>
          <p className="mt-3 text-center">
            <span onClick={toggleForm} className="text-primary" style={{ cursor: "pointer" }}>
              {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
            </span>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AuthForm;
