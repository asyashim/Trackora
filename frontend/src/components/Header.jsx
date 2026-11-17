
import React from "react";
import {useNavigate} from "react-router-dom"

const Header = () => {

   const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div>
        <p className="welcome-text">WELCOME BACK</p>
        
        <p className="subtitle">
          Here's an overview of your job search progress.
        </p>
      </div>

      <div className="profile">
        <div className="avatar">U</div>

        <div>
          <strong>My Workspace</strong>
          <p>Job Seeker</p>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
