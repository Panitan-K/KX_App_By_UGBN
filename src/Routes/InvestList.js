import './css/App.css';
import React, { useEffect, useState } from 'react';
import Revert from "./image/svg/Revert.png";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase';

function InvestList() {
  const location = useLocation();
  const [xinvestorID, setInvestorID] = useState("");
  const [startups, setStartups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.ID) {
      setInvestorID(location.state.ID);
    }
    window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts

    // Fetch startups from Firestore
    const fetchStartups = async () => {
      try {
        const startupCollectionRef = collection(db, 'Startup');
        const startupQuerySnapshot = await getDocs(startupCollectionRef);

        if (!startupQuerySnapshot.empty) {
          const startupData = startupQuerySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setStartups(startupData);
        } else {
          console.error("No startup documents found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStartups();
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
            <img src={startup.imgSrc} alt="Welcome"/>
            <table className='StartupTable'>
              <tbody>
                <tr>
                  <td>Startup</td>
                  <td>: {startup.startupName}</td>
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
