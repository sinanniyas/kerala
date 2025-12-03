import React from 'react';

const Sidebar = ({ currentPage, setCurrentPage }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'places', label: 'Tourist Places', icon: '🏝️' },
    { id: 'add-place', label: 'Add New Place', icon: '➕' },
    { id: 'form' , label:'contacts' , icon: '📊'}
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h4 className="sidebar-title">🌴 Kerala Tourism</h4>
        <p className="sidebar-subtitle">Admin Panel</p>
      </div>
      <nav className="nav">
        {menuItems.map(item => (
          <div
            key={item.id}
            onClick={() => setCurrentPage(item.id)}
            className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;