import './css/App.css';
import React,{ useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
//import U16_9 from "./image/Mock/Uphasia16_9.png"
import plus from "./image/svg/plusicon.png"
import minus from "./image/svg/minusicon.png"
import Revert from "./image/svg/Revert.png"
//import riskslider from "./image/svg/RiskSlider.png"
//import RiskChart from "./RiskChart.js"
import ticketData from './mockJSON/Tickets.json'; // Import your existing JSON data

function CreateTicket() {
    

    const navigate = useNavigate();
    const [capital, setCapital] = useState(25);
    const [stake, setStake] = useState(5);
  
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts
      }, []);


    const increaseStake = () => {
        
        if (stake < 20) {
            setStake(prevStake => prevStake + 1);
        }
        
    };

    const decreaseStake = () => {
        if (stake > 1) {
        setStake(prevStake => prevStake - 1);
        }
    };

    const increaseCapital = () => {
        if (capital < 150) {
        setCapital(prevCapital => prevCapital + 5);
        }
    };

    const decreaseCapital = () => {
        if (capital > 5) {
        setCapital(prevCapital => prevCapital - 5);
        }
    };
    const HandleInvest = () => {
        const newTicket = {
          id: ticketData.length + 1, // Generate a unique ID (this is a simple approach)
          startupName : "Uphasia",
          investorName: null,
          ticketName: `Ticket-${Date.now()}`,
          stake: stake,
          capital: capital,
        };
    
        // Append the new ticket to the existing ticketData array
        const updatedTickets = [...ticketData, newTicket];
    
        // Log the updated array (you would typically handle persistence here, such as sending the data to a server)
        console.log('Updated Tickets:', updatedTickets);
    
        // Redirect to another page after creating the ticket
        navigate('/Startup');
      };
    

    return (

    <div className="App">

        <div className='static-bar'>
            <img src={Revert} alt="Welcome" className='Revertbutton' onClick={() => navigate('/Startup')}/>
            <p style={{fontSize:"7vw"}}>Create Ticket</p>
        </div>
        
        <div className='AppWithHeaderContent2'>
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
            <div className='StartupsInfoBlocks3'>
               
                
  
                <div className='Divisor'>

                <h1>Avaliable Tickets</h1>
                </div>


                <div className='OfferBox'>
                    
                    <div class="ValueSpanContainer">
                    <h1>Stake</h1>
                    <div className='ValueSpan'>
                        <img src={minus} alt="Welcome" onClick={decreaseStake}/>
                        <h1>{stake}%</h1>
                        <img src={plus} alt="Welcome" onClick={increaseStake}/>
                    </div>

                    <h1>Capital</h1>
                    <div className='ValueSpan'>
                        <img src={minus} alt="Welcome" onClick={decreaseCapital}/>
                        <h1>{capital}K</h1>
                        <img src={plus} alt="Welcome" onClick={increaseCapital}/>
                    </div>
                    
                    
                </div>
                 
                    
                        <button className='InvestButton' onClick={() => HandleInvest()} >Create Ticket</button>

                   
                    </div>
                
            </div>
           
        </div>
        

    </div>



  );
}

export default CreateTicket;