
import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <aside className="sidebar">
      <h2 className="logo">
        Trackora<span>.</span>
      </h2>

      <p className="menu-label">MENU</p>

      <nav className="sidebar-nav">
        <NavLink
  to="/dashboard"
  end
  className={({ isActive }) =>
    `nav-item ${isActive ? "active" : ""}`
  }
>
  ▦ Overview
</NavLink>
        <a href="#applications" className="nav-item">
  ▤ Applications
</a>

          <NavLink
    to="/resumes"
    className={({ isActive }) =>
      `nav-item ${isActive ? "active" : ""}`
    }
  >
    ▣ Resume Manager
  </NavLink>
        <div className="nav-item">◷ Insights</div>
      </nav>

      <div className="sidebar-bottom">
  <div className="user-info">
    <div className="avatar">
      {user?.name?.charAt(0).toUpperCase() || "U"}
    </div>

    <div>
      <strong>{user?.name || "User"}</strong>
      <p>{user?.email || "Job Seeker"}</p>
    </div>
  </div>

  <div className="nav-item">⚙ Settings</div>
</div>
    </aside>
  );
};

export default Sidebar;
