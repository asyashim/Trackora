
import React from "react";

const StatCard = ({ title, count, description, icon, color }) => {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        {icon}
      </div>

      <p>{title}</p>

      <h2>{count}</h2>

      <span>{description}</span>
    </div>
  );
};

export default StatCard;
