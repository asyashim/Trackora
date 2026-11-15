
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form submitted");
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

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="auth-button">
              Login
            </button>

          </form>

          <p className="auth-switch">
            Don't have an account? <a href="/Register">Register</a>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Login;
