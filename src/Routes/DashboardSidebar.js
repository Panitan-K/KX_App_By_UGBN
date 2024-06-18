import React from 'react';
import './css/DashboardSideBar.css';
import Title from './image/logo/KX2.png';

function DashboardSideBar({ selectedOption, setSelectedOption }) {
  return (
    <div className="DashboardSideBar">
     
        <img src={Title} alt="Welcome" className="KX_Sidebar_Logo" />
   
      <ul>
        <li
          className={selectedOption === 'Display' ? 'selected' : ''}
          onClick={() => setSelectedOption('Display')}
        >
          Display
        </li>
        <li
          className={selectedOption === 'Startup' ? 'selected' : ''}
          onClick={() => setSelectedOption('Startup')}
        >
          Startups
        </li>
        <li
          className={selectedOption === 'Investor' ? 'selected' : ''}
          onClick={() => setSelectedOption('Investor')}
        >
          Investors
        </li>
        <li
          className={selectedOption === 'Tickets' ? 'selected' : ''}
          onClick={() => setSelectedOption('Tickets')}
        >
          Tickets
        </li>
        <li
          className={selectedOption === 'Placeholder' ? 'selected' : ''}
          onClick={() => setSelectedOption('Placeholder')}
        >
         
        </li>
      </ul>
    </div>
  );
}

export default DashboardSideBar;
