import React from 'react';

const TopNavbar = () => {
  return (
    <div className="top-navbar">
      <div className="navbar-content">
        <div className="navbar-brand">Admin Dashboard</div>
        <div className="navbar-right">
          <span className="badge">Admin</span>
          <span className="admin-name">Kerala Tourism Officer</span>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;