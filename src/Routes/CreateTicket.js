import './css/App.css';
import React,{ useState } from 'react';
import { useNavigate } from "react-router-dom";
import U16_9 from "./image/Mock/Uphasia16_9.png"
import plus from "./image/svg/plusicon.png"
import minus from "./image/svg/minusicon.png"
import Revert from "./image/svg/Revert.png"
import riskslider from "./image/svg/RiskSlider.png"
//import RiskChart from "./RiskChart.js"


function CreateTicket() {
    const [risk, setRisk] = useState(50);

    const navigate = useNavigate();
    const [capital, setCapital] = useState(25);
    const [ROI, setROI] = useState(5);
    const [content,setContent] = useState("");
    const handleChange = (e) => {
        setRisk(e.target.value);
    };
    const getTrackColor = () => {
        const green = 'rgb(245, 0, 245,0)'; // Green color
        const blue = 'rgb(245, 0, 245,1)'; // Blue color

        return `linear-gradient(to right, ${green} ${risk}%, ${blue} ${risk}%)`;
    };
    const increaseROI = () => {
        setROI(prevROI => prevROI + 1);
    };

    const decreaseROI = () => {
        setROI(prevROI => prevROI - 1);
    };

    const increaseCapital = () => {
        setCapital(prevCapital => prevCapital + 5);
    };

    const decreaseCapital = () => {
        setCapital(prevCapital => prevCapital - 5);
    };
    const HandleInvest = () => {
        console.log("Capital :",  capital)
        console.log("ROI :" ,ROI)
        console.log("risk :" ,risk)
        console.log("Content :",content)
    }
    const handleContent = (e) =>{ 
        setContent(e.target.value)
    }
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
                        <img src={minus} alt="Welcome" onClick={decreaseROI}/>
                        <h1>{ROI}%</h1>
                        <img src={plus} alt="Welcome" onClick={increaseROI}/>
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