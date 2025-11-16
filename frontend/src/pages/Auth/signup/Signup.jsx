import { useState } from "react";
import { signupUser } from "../../../api/auth_api";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser(form);
      setSuccess("Signup successful! Redirecting...");
      setError("");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.log("SIGNUP ERROR:", err.response);
      setError(err.response?.data?.message ||
        err.response?.data?.errors?.[0]?.msg ||
        "Signup failed"
      );
      setSuccess("");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Create Account</h2>
          <p>Join us today and get started</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Full Name</label>
            <div className="input-icon">
              <i className="fas fa-user"></i>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your full name"
                value={form.username}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-icon">
              <i className="fas fa-envelope"></i>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-icon">
              <i className="fas fa-lock"></i>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
        </form>

        <div className="signup-footer">
          Already have an account? 
          <span className="login-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;