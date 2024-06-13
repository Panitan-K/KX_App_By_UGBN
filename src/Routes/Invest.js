import './css/App.css';
import React,{ useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import U16_9 from "./image/Mock/Uphasia16_9.png"
//import plus from "./image/svg/plusicon.png"
//import minus from "./image/svg/minusicon.png"
import Revert from "./image/svg/Revert.png"
//import riskslider from "./image/svg/RiskSlider.png"
import ticketData from "./mockJSON/Tickets.json"
//import RiskChart from "./RiskChart.js"


function Invest() {
    //const [risk, setRisk] = useState(50);

    const navigate = useNavigate();
    //const [capital, setCapital] = useState(100);
    //const [ROI, setROI] = useState(15.0);
    const [content,setContent] = useState("");
    /*const handleChange = (e) => {
        setRisk(e.target.value);
    };
    /*const getTrackColor = () => {
        const green = 'rgb(245, 0, 245,0)'; // Green color
        const blue = 'rgb(245, 0, 245,1)'; // Blue color

        return `linear-gradient(to right, ${green} ${risk}%, ${blue} ${risk}%)`;
    };*/



    const HandleInvest = () => {

    }
    const handleContent = (e) =>{ 
        setContent(e.target.value)
    }
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts
      }, []);

    return (

    <div className="App">

        <div className='static-bar'>
            <img src={Revert} alt="Welcome" className='Revertbutton' onClick={() => navigate('/StartupInfo')}/>
            <p style={{fontSize:"7vw"}}> Invest in Uphasia</p>
        </div>
        
        <div className='AppWithHeaderContent2'>

            <div className='StartupsInfoBlocks3'>
                <img src={U16_9} alt="Welcome"/>
                <h1>You are investing in</h1>
                <h1> Uphasia</h1>
                
                <div className='Divisor'>

                <h1>Avaliable Tickets</h1>
                </div>
                <div className="PortfolioBox" >
                {ticketData.map(ticket => (
            <div key={ticket.id}>
              <div className='TicketBlocks'>
                <h1>{ticket.ticketName}</h1>
                <h2>
                     {ticket.stake}% Stake for $ {ticket.capital}K 
                </h2>
                <h3>Investor : {ticket.investorName}</h3>
              </div>
              
            </div>
          ))}
                </div> 
                <div className='OfferBox'>
                    
                    
                    <div className='Divisor'>
                        <h1>Startup Rating</h1>
                        
                    </div>
                    <div className='RatingBox'>
                        
                    

                    <div className='OfferBox'>
                    <h1>Investor's Evaluated Risk</h1>
               
                    
                    </div>
                    
                    </div>

                    <div className='OfferBox'>


                    
                        <h2>Why would you invest in this company</h2>
                        <div class="ValueSpanContainer">
                        <div className="appleInputContainer2">
                          
                            <textarea
                            type="text"
                            className="appleInput2"
                            value={content}
                            onChange={handleContent}
                        
                            />
                        </div>
                        </div>
                    </div>
                        <button className='InvestButton' onClick={() => HandleInvest()} >INVEST</button>

                   
                    </div>
                
            </div>
           
        </div>
        

    </div>



  );
}

export default Invest;