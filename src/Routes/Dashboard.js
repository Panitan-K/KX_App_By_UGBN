import './css/App.css';
import StartupAdministration from './AdminModule/StartupAdministration.js';
import React, { useState } from "react";
import DashboardSideBar from './DashboardSidebar.js';
import InvestorAdministration from './AdminModule/InvestorAdministration.js';
import TicketAdministration from './AdminModule/TicketAdministration.js';
import DisplayAdministration from './AdminModule/DisplayAdministration.js';
function Dashboard() {

  const [selectedOption, setSelectedOption] = useState('');
  const renderContent = () => {
    console.log(selectedOption)
    switch (selectedOption) {
      case 'Display':
        return <DisplayAdministration/>;
      case 'Startup':
        return <StartupAdministration/> ;
      case 'Investor':
        return <InvestorAdministration/> ;;
      case 'Tickets':
        return <TicketAdministration/> ;
      case 'Placeholder':
        return ;
      default:
        setSelectedOption('Display')
        return ;
    }
  };
  /*const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/investment-data');
      const fetchedData = response.data;
      //console.log("THIS IS FETCHED DATA ", fetchedData);

      // Transform the data into an array of quarters
      const transformedData = [];
      let quarterIndex = 1;
      let quarterKey = `Q${quarterIndex}`;

      while (fetchedData.hasOwnProperty(quarterKey)) {
        transformedData.push({
          quarter: quarterKey,
          data: fetchedData[quarterKey].map(item => {
            if (!colorMap.current.has(item.Company)) {
              colorMap.current.set(item.Company, getRandomColor());
            }
            return {
              name: item.Company,
              value: item.Evaluation,
              color: colorMap.current.get(item.Company),
            };
          })
        });

        quarterIndex++;
        quarterKey = `Q${quarterIndex}`;
      }

      setData(transformedData);
      //console.log("THIS IS Transform DATA ", transformedData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };*/


  return (
      <div className="Dashboard-App">
        <DashboardSideBar selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        <div className="Dashboard-Content">
          {renderContent()}
        
        </div>
        
    </div>
  );
}

// Optional: A function to generate random colors
/*const getRandomColor = () => {
  const hue = Math.floor(Math.random() * 360); // Random hue between 0 and 360
  const saturation = Math.floor(Math.random() * 50) + 50; // Saturation between 50% and 100%
  const lightness = Math.floor(Math.random() * 20) + 50; // Lightness between 50% and 70%

  return hslToHex(hue, saturation, lightness);
};

const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0'); // Convert to Hex and pad with leading zero
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};*/
export default Dashboard;
