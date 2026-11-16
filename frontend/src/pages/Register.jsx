
import "./Register.css";
import { Link ,useNavigate } from "react-router-dom";
import {useState} from "react";
import { registerUser } from "../api/authApi";

const Register = () => {

  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate =useNavigate()


 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await registerUser({
      name,
      email,
      password,
    });

    console.log(data.message);
    console.log(data.user);

  navigate("/login")
   


  } catch (error) {
    console.error("Registration failed:", error.message);
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
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>

            <button type="submit" className="auth-button">
              Create Account
            </button>

          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </div>
      </div>

    </div>
  );
};

export default Register;
