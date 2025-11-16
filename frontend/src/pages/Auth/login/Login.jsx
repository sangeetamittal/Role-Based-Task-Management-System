import { useState, useContext } from "react";
import { loginUser } from "../../../api/auth_api";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      login(res.data.user, res.data.token);

      // redirect based on role
      if (res.data.user.role === "Admin") navigate("/admin/dashboard");
      else if (res.data.user.role === "Manager") navigate("/manager/dashboard");
      else navigate("/user/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue to your account</p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

        <div className="login-footer">
          Don't have an account?
          <span className="signup-link" onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;