
import "./Login.css";
import { Link,useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import { useState } from "react";

const Login = () => {
  const navigate=useNavigate()

  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error ,setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const data = await loginUser({
      email,
      password,
    });

    console.log(data.message);
    console.log(data.user);
    console.log(data.token);

    navigate("/dashboard");

  } catch (error) {
    setError( error.message);
  }
};


  return (
    <div className="auth-container">

      {/* Left Side */}
      <div className="auth-left">
        <h1 className="auth-logo">
          Trackora<span>.</span>
        </h1>

        <div className="auth-left-content">
          <h2>Welcome back!
            <br />
            Your journey continues here.
          </h2>

          <p>
            Stay organized, track your applications,
            and take the next step towards your dream career.
          </p>
        </div>

        <p className="auth-footer">
          © 2026 Trackora. All rights reserved.
        </p>
      </div>

      {/* Right Side */}
      <div className="auth-right">
        <div className="login-form-container">

          <h2>Welcome back</h2>

          <p className="auth-subtitle">
            Login to access your Trackora account.
          </p>

          <form onSubmit={handleSubmit}>

             {error && <p className="error-message">{error}</p>}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-button">
              Login
            </button>

          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/Register">Register</Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;
