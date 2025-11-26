import React from 'react';

const DashboardHome = () => {
  return (
    <div>
      <h2 className="page-title">Dashboard Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏝️</div>
          <h3 className="stat-number">156</h3>
          <p className="stat-label">Total Places</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏖️</div>
          <h3 className="stat-number">23</h3>
          <p className="stat-label">Beaches</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⛰️</div>
          <h3 className="stat-number">18</h3>
          <p className="stat-label">Hill Stations</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚤</div>
          <h3 className="stat-number">31</h3>
          <p className="stat-label">Backwaters</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-main">
          <div className="card">
            <h5 className="card-title">Recent Activities</h5>
            <div className="activity-list">
              <div className="activity-item">
                <span className="activity-icon">➕</span>
                <span>New place "Varkala Beach" added</span>
                <span className="activity-time">2 hours ago</span>
              </div>
              <div className="activity-item">
                <span className="activity-icon">✏️</span>
                <span>Updated "Munnar" details</span>
                <span className="activity-time">5 hours ago</span>
              </div>
              <div className="activity-item">
                <span className="activity-icon">➕</span>
                <span>New place "Bekal Fort" added</span>
                <span className="activity-time">1 day ago</span>
              </div>
              <div className="activity-item">
                <span className="activity-icon">✏️</span>
                <span>Updated "Athirappilly" images</span>
                <span className="activity-time">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="dashboard-sidebar">
          <div className="card">
            <h5 className="card-title">Quick Stats</h5>
            <div className="quick-stats">
              <div className="quick-stat-item">
                <strong>14</strong> Districts Covered
              </div>
              <div className="quick-stat-item">
                <strong>13</strong> Categories
              </div>
              <div className="quick-stat-item">
                <strong>98%</strong> Places Verified
              </div>
              <div className="quick-stat-item">
                <strong>5.2K</strong> Monthly Visitors
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;