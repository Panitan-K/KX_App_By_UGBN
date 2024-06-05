import './css/App.css';
import React from 'react';
import PersonIcon from "./image/Mock/KL_Placeholder.jpeg"
import StartupIcon from "./image/svg/person.png"
import { useNavigate} from "react-router-dom";

function InvestorMain() {
  const navigate = useNavigate();

  return (

    <div className="App">

      <div className='InvestorProfile'>
        <img src={PersonIcon} alt="Welcome" className='InvestorIcon' />
        <div className='InvestorNameBox'>
          <h2 style={{ lineHeight: "2vh" }}>Investor FirstName</h2>
          <h2>Investor Surname</h2>
        </div>
      </div>

      <div className='BalanceBox'>
        <p style={{ lineHeight: "1vh", fontSize: "10vw", marginBlockStart: "5vh",marginBlockEnd: "3vh" }}>Account Balance</p>
        <p className='Cash' style={{  marginBlockStart: "0vh", marginBlockEnd: "2vh" }}>250 K</p>
        <span style={{ lineHeight: "0vh", marginBlockStart: "1vh", fontSize: "5vw" }}>
          <span>Total </span>
          <span style={{ color: '#079F16' }}> 750K </span>
          <span>invested in </span>
          <span style={{ color: '#079F16' }}>3</span>
          <span> Startups</span>
        </span>
      </div>

      <button className='InvestButton' onClick={() => navigate('/InvestList')} >INVEST NOW</button>
      <div className="PortfolioBox" >
        <h1>Portfolio</h1>

        <div className='StartupsBlocks'>
          <img src={StartupIcon} alt="Welcome" className='InvestorIcon' />
          <p>Startup_Name</p>
        </div>

        <div className='StartupsBlocks'>
          <img src={StartupIcon} alt="Welcome" className='InvestorIcon' />
          <p>Startup_Name</p>
        </div>
        
        <div className='StartupsBlocks'>
          <img src={StartupIcon} alt="Welcome" className='InvestorIcon' />
          <p>Startup_Name</p>
        </div>
      </div>

      

      
    </div>



  );
}

export default InvestorMain;