import React, { useEffect, useState } from "react";

const DashboardHome = () => {
  const [places, setPlaces] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    beaches: 0,
    hillStations: 0,
    backwaters: 0,
    districts: 0,
    categories: 0,
    verifiedPercentage: 0,
    monthlyVisitors: 0,
  });

  useEffect(() => {
    // Generate 200+ fake places
    const categories = ["Beaches", "Hill Stations", "Backwaters"];
    const districts = [
      "Thiruvananthapuram",
      "Kollam",
      "Alappuzha",
      "Kottayam",
      "Idukki",
      "Ernakulam",
      "Thrissur",
      "Palakkad",
      "Malappuram",
      "Kozhikode",
      "Wayanad",
      "Kannur",
      "Kasaragod",
      "Pathanamthitta",
    ];

    const fakePlaces = Array.from({ length: 220 }, (_, i) => {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const district = districts[Math.floor(Math.random() * districts.length)];
      return {
        _id: i + 1,
        name: `${category} Place ${i + 1}`,
        category,
        district,
        createdAt: new Date(Date.now() - Math.random() * 1000 * 60 * 60 * 24 * 30).toISOString(), // random date in last 30 days
        isNew: Math.random() > 0.5,
        isVerified: Math.random() > 0.1,
      };
    });

    setPlaces(fakePlaces);

    // Compute stats
    const beaches = fakePlaces.filter(p => p.category === "Beaches").length;
    const hillStations = fakePlaces.filter(p => p.category === "Hill Stations").length;
    const backwaters = fakePlaces.filter(p => p.category === "Backwaters").length;
    const uniqueDistricts = [...new Set(fakePlaces.map(p => p.district))].length;
    const uniqueCategories = [...new Set(fakePlaces.map(p => p.category))].length;
    const verifiedPercentage = Math.round((fakePlaces.filter(p => p.isVerified).length / fakePlaces.length) * 100);
    const total = fakePlaces.length;

    setStats({
      total,
      beaches,
      hillStations,
      backwaters,
      districts: uniqueDistricts,
      categories: uniqueCategories,
      verifiedPercentage,
      monthlyVisitors: 5200, // you can randomize or make dynamic if you want
    });
  }, []);

  return (
    <div>
      <h2 className="page-title">Dashboard Overview</h2>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🏝️</div>
          <h3 className="stat-number">{stats.total}</h3>
          <p className="stat-label">Total Places</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏖️</div>
          <h3 className="stat-number">{stats.beaches}</h3>
          <p className="stat-label">Beaches</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⛰️</div>
          <h3 className="stat-number">{stats.hillStations}</h3>
          <p className="stat-label">Hill Stations</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚤</div>
          <h3 className="stat-number">{stats.backwaters}</h3>
          <p className="stat-label">Backwaters</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-main">
          <div className="card">
            <h5 className="card-title">Recent Activities</h5>
            <div className="activity-list">
              {places
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 10) // show latest 10 activities
                .map(place => (
                  <div key={place._id} className="activity-item">
                    <span className="activity-icon">{place.isNew ? "➕" : "✏️"}</span>
                    <span>{place.isNew ? `New place "${place.name}" added` : `Updated "${place.name}"`}</span>
                    <span className="activity-time">{new Date(place.createdAt).toLocaleString()}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="dashboard-sidebar">
          <div className="card">
            <h5 className="card-title">Quick Stats</h5>
            <div className="quick-stats">
              <div className="quick-stat-item">
                <strong>{stats.districts}</strong> Districts Covered
              </div>
              <div className="quick-stat-item">
                <strong>{stats.categories}</strong> Categories
              </div>
              <div className="quick-stat-item">
                <strong>{stats.verifiedPercentage}%</strong> Places Verified
              </div>
              <div className="quick-stat-item">
                <strong>{stats.monthlyVisitors.toLocaleString()}</strong> Monthly Visitors
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
