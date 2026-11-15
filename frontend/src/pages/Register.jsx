
import "./Register.css";
import { Link } from "react-router-dom";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration form submitted");
  };

  return (
    <div className="auth-container">

      {/* Left Side */}
      <div className="auth-left">
        <h1 className="auth-logo">
          Trackora<span>.</span>
        </h1>

        <div className="auth-left-content">
          <h2>Your career journey,
            <br />
            organized in one place.
          </h2>

          <p>
            Track your job applications, manage interviews,
            and stay focused on your career goals.
          </p>
        </div>

        <p className="auth-footer">
          © 2026 Trackora. All rights reserved.
        </p>
      </div>

      {/* Right Side */}
      <div className="auth-right">
        <div className="register-form-container">

          <h2>Create your account</h2>

          <p className="auth-subtitle">
            Start organizing your job search today.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                required
              />
            </div>

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
                placeholder="Create a password"
                required
                minLength={8}
              />
            </div>

            <button type="submit" className="auth-button">
              Create Account
            </button>

          </form>

          <p className="auth-switch">
            Already have an account? <a href="/login">Login</a>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Register;
