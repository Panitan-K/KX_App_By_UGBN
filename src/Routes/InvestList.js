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
  const renderStartupCircle = (startup, index) => (
    <div className='StartupIconList'>
    <div 
      key={index}
      className='CircleStartup'
      onClick={() => handleNavigate(startup)}
    >
      <img src={startup.imgSrc} alt="Welcome"/>
      
    </div>
    <div className='Label'>{startup.startupName}</div>
    </div>
  );

  useEffect(() => {
    console.log(location.state)
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
    navigate('/StartupInfo', { state: { ID: xinvestorID, Startup :startup, InvestorInfo : location.state } })
  };

  return (
    <div className="App">
      <div className='static-bar'>
        <img 
          src={Revert} 
          alt="Welcome" 
          className='Revertbutton' 
          onClick={() => navigate('/InvestorMain', { state: { ID: xinvestorID, InvestorInfo : location.state} })} 
        />
        <p> Startups</p>
      </div>

      <div className='AppWithHeaderContent'>
        <div className='GridContainerEX'>
        {startups.map((startup, index) => (
            renderStartupCircle(startup, index)
          ))}
        </div>
      </div>
    </div>
  );
}

export default InvestList;
