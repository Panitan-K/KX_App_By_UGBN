import './css/App.css';
import React from 'react';
//import PersonIcon from "./image/Mock/KL_Placeholder.jpeg"
import InvestorIcon from "./image/svg/Person_Vector.svg"
//import { useNavigate} from "react-router-dom";
import U16_9 from "./image/Mock/Uphasia16_9.png"
import DonutChart from './DonutChart';

function Startup() {
  //const navigate = useNavigate();
  
return (

    <div className="App">
    <div className='static-bar'>
           <p style={{fontSize:"7vw"}}>Startup : Uphasia</p>
        </div>
        <div className='AppWithHeaderContent'>
    
    <div className='StartupsInfoBlocks3' >
        <img src={U16_9} alt="Welcome"/>
    </div>
    
    <DonutChart />

      <div className="PortfolioBox" >
        <h1>Investors</h1>

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