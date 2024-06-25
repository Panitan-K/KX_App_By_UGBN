import './css/App.css';
import StartupAdministration from './AdminModule/StartupAdministration.js';
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardSideBar from './DashboardSidebar.js';
import InvestorAdministration from './AdminModule/InvestorAdministration.js';
import TicketAdministration from './AdminModule/TicketAdministration.js';
import DisplayAdministration from './AdminModule/DisplayAdministration.js';
function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState('');

  // Access the role from location state
  const userRole = location.state?.role;

  // Check the role and navigate accordingly
  useEffect(() => {
    if (userRole !== 'admin') {
      navigate('/AdminLogin');  // Redirect to home or any other route if not admin
    }
  }, [userRole, navigate]);

  // Function to render content based on the selected option
  const renderContent = () => {
    switch (selectedOption) {
      case 'Display':
        return <DisplayAdministration/>;
      case 'Startup':
        return <StartupAdministration/> ;
      case 'Investor':
        return <InvestorAdministration/>;
      case 'Tickets':
        return <TicketAdministration/> ;
      case 'Placeholder':
        return null; // Empty or placeholder content
      default:
        setSelectedOption('Display');
        return null;
    }
  };

  return (
    <div className="Dashboard-App">
      <DashboardSideBar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      <div className="Dashboard-Content">
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;

