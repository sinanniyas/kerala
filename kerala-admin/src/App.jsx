import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/Topnavbar';
import DashboardHome from './components/DashboardHome';
import PlacesTable from './components/PlacesTable';
import AddPlaceForm from './components/AddPlaceForm';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardHome />;
      case 'places':
        return <PlacesTable />;
      case 'add-place':
        return <AddPlaceForm />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="app">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="main-content">
        <TopNavbar />
        <div className="content-area">
          {renderPage()}
        </div>
      </div>
    </div>
  );
}

export default App;