import './css/App.css';
import React, { useEffect, useState } from 'react';
import Search from "./image/svg/Search_Icon.png"; 
import { useNavigate, useLocation } from "react-router-dom";
import { collection, getDocs } from 'firebase/firestore';
import { db } from './Firebase';
import StartupBlockAvatar from './Component/StartupBlockAvatar';
//import footer from "./image/Mock/Footer.png"
import FooterRocket from "./image/svg/rocket.png";
import FooterHouse from "./image/svg/house.png";
import FooterRevert from "./image/svg/Revert.png";
function InvestList() {
  const location = useLocation();
  const [xinvestorID, setInvestorID] = useState("");
  const [startups, setStartups] = useState([]);
  const navigate = useNavigate();

  /*const renderStartupCircle = (startup, index) => (
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
  );*/

  const renderStartupBlock = (startup, index) => (
    <div>
      
    <div 
      key={index}
      onClick={() => handleNavigate(startup)}
    >
      <StartupBlockAvatar
                  imgLink= {startup.imgSrc}
                  StartupName={startup.startupName}
                  Sector={startup.industry}
                />
      
    </div>
 
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
  /* OLD HTML */
  /*  <img 
          src={Revert} 
          alt="Welcome" 
          className='Revertbutton' 
          onClick={() => navigate('/InvestorMain', { state: { ID: xinvestorID, InvestorInfo : location.state} })} 
        />
        <p> Startups</p>*/
  return (
    <div className="App" style={{backgroundColor:"white"}}>
      <div className='static-bar'>
        <div className='Static-Header-Container'>
          <div>
          <h1>Startup Profile</h1>
          <p>from TECHBITE 5.0 Incubation program</p>
          </div>
        <img src={Search} alt="Welcome"/>
        </div>
        
      </div>
      <div className='Spacer'>
         
      </div>

      {startups.map((startup, index) => (
            renderStartupBlock(startup, index)
          ))}
      <footer className="FooterNavBar">
        <img src={FooterRocket} alt="Footer" />
        <img src={FooterHouse} alt="Footer" onClick={() =>navigate('/InvestorMain', { state: { ID: xinvestorID } })}/>
        <img src={FooterRevert} alt="Footer" onClick={() =>navigate('/InvestorMain', { state: { ID: xinvestorID } })}/>
      </footer>
    </div>
    
  );
}

export default InvestList;
