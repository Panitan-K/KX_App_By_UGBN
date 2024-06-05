import './css/App.css';
import React from 'react';
import PersonIcon from "./image/svg/person.png"


function InvestorMain() {


  return (
    
    <div className="App">
    

      <div className='InvestorProfile'>
        <img src={PersonIcon} alt="Welcome" className='InvestorIcon'/>
        <div>
        <h2>Investor FirstName</h2>
        <h2>Investor Surname</h2>
        </div>
        
      </div>

      <div className='BalanceBox'>
      <p>Account Balance</p>
      <p className='Cash'>250 K</p>
      <p>Total 750K invested in 3 Startups</p>

      </div>

      <button className='InvestButton'>INVEST NOW</button>
      <img></img>


      <div className="PortfolioBox" >
      <h1>Portfolio</h1>
      </div>
        
      
   
    </div>

  
    
  );
}

export default InvestorMain;