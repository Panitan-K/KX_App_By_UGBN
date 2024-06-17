import './css/App.css';
import React, { useEffect, useState } from 'react';
import Revert from "./image/svg/Revert.png";
import { useNavigate, useLocation } from "react-router-dom";
//import Uphasia from './image/Mock/Uphasia16_9.png'
// Define an array of startup objects with their attributes
const startups = [
  { 
    name: 'Uphasia', 
    industry: 'HealthTech', 
    stage: 'Pre-Seed', 
    image: 'https://media.licdn.com/dms/image/D4E16AQFRxnQgIJwY8A/profile-displaybackgroundimage-shrink_350_1400/0/1710916681441?e=1724284800&v=beta&t=gqrdbR1-Ivwi7xDqJtslY-xQNGx0buTA3RA0uZfwXXo' 
  },
  { 
    name: 'Scamify', 
    industry: 'Digital Technology', 
    stage: 'Pre-Seed', 
    image: 'https://scontent.fbkk9-2.fna.fbcdn.net/v/t39.30808-6/426595315_122120614988195581_8417236307295775104_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_ohc=dBCiyG9nJx0Q7kNvgFKeOqh&_nc_ht=scontent.fbkk9-2.fna&cb_e2o_trans=q&oh=00_AYBxYNHOaKvtYm6zJzBuCKLuM1V1jlhzZgYKnG-PaPGpFw&oe=66758C6E' 
  },
  { 
    name: 'StartupName', 
    industry: 'StartupIndustry', 
    stage: 'StartupStage', 
    image: './image/Mock/StartupName16_9.png' 
  }
];

function InvestList() {
  const location = useLocation();
  const [xinvestorID, setInvestorID] = useState("");

  const navigate = useNavigate();
  
  useEffect(() => {
    if (location.state && location.state.ID) {
      setInvestorID(location.state.ID);
    }
    window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts
  }, [location.state]);

  const handleNavigate = (startup) => {
    navigate('/StartupInfo', { state: { ID: xinvestorID, startup } });
  };

  return (
    <div className="App">
      <div className='static-bar'>
        <img 
          src={Revert} 
          alt="Welcome" 
          className='Revertbutton' 
          onClick={() => navigate('/InvestorMain', { state: { ID: xinvestorID } })} 
        />
        <p> Startups</p>
      </div>

      <div className='AppWithHeaderContent'>
        {startups.map((startup, index) => (
          <div 
            key={index}
            className='StartupsInfoBlocks' 
            onClick={() => handleNavigate(startup)}
          >
            <img src={startup.image} alt="Welcome"/>
            <table className='StartupTable'>
              <tbody>
                <tr>
                  <td>Startup</td>
                  <td>: {startup.name}</td>
                </tr>
                <tr>
                  <td>Industry</td>
                  <td>: {startup.industry}</td>
                </tr>
                <tr>
                  <td>Stage</td>
                  <td>: {startup.stage}</td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InvestList;
