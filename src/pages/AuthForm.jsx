import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

const AuthForm = ({ setToken }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setFormData({ name: "", email: "", password: "" }); // 🔹 Reset all fields
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isSignup ? `${API_URL}/auth/register` : `${API_URL}/auth/login`;
    
    // 🔹 Send "name" only for sign-up
    const requestData = isSignup
      ? formData
      : { email: formData.email, password: formData.password };

    try {
      const response = await axios.post(url, requestData);

      if (isSignup) {
        alert("Sign-up successful! Please log in.");
        setIsSignup(false); // 🔹 Switch to sign-in form after sign-up
        setFormData({ name: "", email: "", password: "" }); // 🔹 Clear input fields
      } else {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        alert("Authentication successful!");
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isSignup ? "Sign Up" : "Sign In"}</button>
      </form>
      <p onClick={toggleForm} style={{ cursor: "pointer", color: "blue" }}>
        {isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default AuthForm;
