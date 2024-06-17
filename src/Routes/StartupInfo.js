import './css/App.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Revert from "./image/svg/Revert.png";

function StartupInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [xinvestorID, setInvestorID] = useState("");
  const [startup, setStartup] = useState(null);

  useEffect(() => {
    if (location.state) {
      setInvestorID(location.state.ID);
      setStartup(location.state.startup);
    }
    window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts
  }, [location.state]);

  if (!startup) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className='static-bar'>
        <img 
          src={Revert} 
          alt="Welcome" 
          className='Revertbutton' 
          onClick={() => navigate('/InvestList', { state: { ID: xinvestorID } })} 
        />
        <p> {startup.name}</p>
      </div>
      
      <div className='AppWithHeaderContent'>
        <div className='StartupsInfoBlocks2'>
          <img src={startup.image} alt="Welcome"/>
          <table className='StartupTable2'>
            <tbody>
              <tr>
                <td>Startup</td>
                <td>:</td>
                <td>{startup.name}</td>
              </tr>
              <tr>
                <td>Industry</td>
                <td>:</td>
                <td>{startup.industry}</td>
              </tr>
              <tr>
                <td>Stage</td>
                <td>:</td>
                <td>{startup.stage}</td>
              </tr>
              <tr>
                <td colSpan="3">
                  <div className="appleInputContainer">
                    <label className="appleInputLabel">Introduction</label>
                    <textarea
                      type="text"
                      className="appleInput"
                      value={startup.introduction}
                      readOnly
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          
          <button 
            className='InvestButton' 
            onClick={() => navigate('/Invest', { state: { ID: xinvestorID,Startup :startup } })}
          >
            INVEST IN {startup.name.toUpperCase()}
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartupInfo;
