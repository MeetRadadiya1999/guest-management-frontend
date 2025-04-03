import { useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsSignup(!isSignup);
    setFormData({ email: "", password: "" });
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isSignup ? `${API_URL}/auth/register` : `${API_URL}/auth/login`;

    try {
      const response = await axios.post(url, formData);
      localStorage.setItem("token", response.data.token);
      alert("Authentication successful!");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <h2>{isSignup ? "Sign Up" : "Sign In"}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
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
