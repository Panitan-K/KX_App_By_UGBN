import './css/App.css';
import React from 'react';
//import PersonIcon from "./image/Mock/KL_Placeholder.jpeg"
import InvestorIcon from "./image/svg/Person_Vector.svg"
import { useNavigate} from "react-router-dom";
import U16_9 from "./image/logo/Uphasia.png"


function Startup() {
  const navigate = useNavigate();
  
return (

    <div className="App">
    <div className='static-bar'>
           <p style={{fontSize:"7vw"}}>Startup : Uphasia</p>
        </div>
        <div className='AppWithHeaderContent'>
    
    <div className='StartupsInfoBlocks3' >
        <img src={U16_9} alt="Welcome"/>
    </div>
    
    <div className='BalanceBox'>
        <p style={{ lineHeight: "1vh", fontSize: "10vw", marginBlockStart: "8vh",marginBlockEnd: "3vh" }}>Stake Remain</p>
        <p className='Cash' style={{  marginBlockStart: "0vh", marginBlockEnd: "2vh" }}>20%</p>
        <span style={{ lineHeight: "0vh", marginBlockStart: "1vh", fontSize: "5vw" }}>
          <span>Total </span>
          <span style={{ color: '#079F16' }}> 0% </span>
          <span>Sold to </span>
          <span style={{ color: '#079F16' }}>0</span>
          <span> Investors</span>
        </span>
      </div>
   
      <button className='InvestButton' onClick={() => navigate('/CreateTicket')} >Create Ticket</button>
      <div className="PortfolioBox" >
        <h1>Tickets</h1>

        <div className='InvestorBlocks'>
          <img src={InvestorIcon} alt="Welcome" className='InvestorIcon' />
          <p>NIA</p>
        </div>

        <div className='InvestorBlocks'>
          <img src={InvestorIcon} alt="Welcome" className='InvestorIcon' />
          <p>ARV</p>
        </div>
        
        <div className='InvestorBlocks'>
          <img src={InvestorIcon} alt="Welcome" className='InvestorIcon' />
          <p>SCB10x</p>
        </div>
      </div>

      

      </div> 
    </div>



  );
}

export default Startup;