
import React from "react";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2 className="logo">
        Trackora<span>.</span>
      </h2>

      <p className="menu-label">MENU</p>

      <nav className="sidebar-nav">
        <div className="nav-item active">▦ Overview</div>
        <div className="nav-item">▤ Applications</div>
        <div className="nav-item">◷ Insights</div>
      </nav>

      <div className="sidebar-bottom">
        <div className="nav-item">⚙ Settings</div>
      </div>
    </aside>
  );
};

export default Sidebar;
