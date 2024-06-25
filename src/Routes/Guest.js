import './css/App.css';
import React, { useEffect } from 'react';
//import PersonIcon from "./image/Mock/KL_Placeholder.jpeg";
import { useNavigate } from "react-router-dom";
import GuestIcon from "./image/svg/Person_Vector.svg"
import Avatar from './Component/Avatar';

//import footer from "./image/Mock/Footer.png"
import FooterRocket from "./image/svg/rocket.png";
import FooterHouse from "./image/svg/house.png";
import FooterRevert from "./image/svg/Revert.png";

function Guest() {
  const navigate = useNavigate();


  useEffect(() => {  
    
    window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts
  })


//const formattedLastName = investorInfo.lastName.length > 1 ? `${investorInfo.lastName.charAt(0)}.` : <h2 style={{ lineHeight: "0.5vh" }}>{investorInfo.lastName}</h2>;

  
  return (
    <div className="App">
       <h3>Techbite 5.0 Demo Day</h3>
          <Avatar name={"Guest"} 
          avatarUrl={GuestIcon} 
          company={"KX Knowledge Exchange"} />

      <div className='PortfolioBox'>
        <div className='PortfolioHead'>
        <h4>Number of startups in an event</h4>
        </div>
      </div>
      <div className='BalanceBox'>
        <p className='Cash2' >{13} </p>
      </div>

      <button className='InvestButton' onClick={() => navigate('/GuestViewList')}>View Startups</button>

      
     
      <footer className="FooterNavBar">
        <img src={FooterRocket} alt="Footer" onClick={() => navigate('/GuestViewList')}  />
        <img src={FooterHouse} alt="Footer" />
        <img src={FooterRevert} alt="Footer" />
      </footer>
    </div>
  );
}

export default Guest;
