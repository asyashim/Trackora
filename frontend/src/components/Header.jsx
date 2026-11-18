
import React from "react";
import {useNavigate} from "react-router-dom"

const Header = () => {

   const navigate = useNavigate();

   const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
          <strong>{user?.name||"User"}</strong>
          <p>{user?.email||"Job Seeker"}</p>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
