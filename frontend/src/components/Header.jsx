
import React from "react";

const Header = () => {
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
      </div>
    </header>
  );
};

export default Header;
