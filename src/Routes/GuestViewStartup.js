import './css/App.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
//import Revert from "./image/svg/Revert.png";
//import footer from "./image/Mock/Footer.png"
import FooterRocket from "./image/svg/rocket.png";
import FooterHouse from "./image/svg/house.png";
import FooterRevert from "./image/svg/Revert.png";
function GuestViewStartup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [startup, setStartup] = useState({
    startupName: '',
    imgSrc: '',
    industry: '',
    stage: '',
    introduction: '',
    productSrc: '',
  });

  useEffect(() => {
    console.log(location.state)
    //console.log(location.state.InvestorInfo.InvestorInfo.firstName + location.state.InvestorInfo.InvestorInfo.lastName)
    if (location.state) {
     
      setStartup(location.state.Startup);
    }
    window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts
  }, [location.state]);


  return (
    <div className="App" style={{backgroundColor:"white"}}>
   
      
      <div className='AppWithHeaderContent'>
      <div class="Infoheader">
          <h2>{startup.startupName}</h2>
          <p>Stage : {startup.stage}</p>
          <p>What we are looking for : 100,000 USD Investment </p>
        </div>
        <div className='StartupsInfoBlocks2'>
          
          <img src={startup.productSrc} alt="Welcome"/>
          <div className="appleInputContainer">
                    <label className="appleInputLabel">Introduction</label>
                    <textarea
                      type="text"
                      className="appleInput"
                      value={"We are Uphasia—the solution for communication disorders in the Thai dialect. As we are aging , dementia becomes inevitable. Dementia or any damage to the brain cause a person to lose the ability to comprehend and produce speech, which degrades their well-being.The traditional solution is for Speech-Language Pathologists (SLPs) to provide rehabilitation to improve or delay the speech condition. However, the availability of SLPs in Thailand is limited to 200 SLPs for 600,000 patients, resulting in a ratio of 1 to 3,000.Uphasia digitalize the speech rehabilitation process through an online platform that would allow everyone using the Thai dialect to access rehabilitation utilizing  ASR technology, which we will further co-develop with the only SLP school in Thailand, Ramathibodi Hospital."}
                      readOnly
                    />
                  </div>

        </div>
      </div>
      <footer className="FooterNavBar">
        <img src={FooterRocket} alt="Footer" onClick={() => navigate('/GuestViewList')}/>
        <img src={FooterHouse} alt="Footer" onClick={() => navigate('/Guest')}/>
        <img src={FooterRevert} alt="Footer" onClick={() => navigate('/GuestViewList')}/>
      </footer>
    </div>
  );
}

export default GuestViewStartup;
