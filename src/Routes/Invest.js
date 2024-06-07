import './css/App.css';
import React,{ useState } from 'react';
import { useNavigate } from "react-router-dom";
import U16_9 from "./image/Mock/Uphasia16_9.png"
import plus from "./image/svg/plusicon.png"
import minus from "./image/svg/minusicon.png"
import Revert from "./image/svg/Revert.png"
import riskslider from "./image/svg/RiskSlider.png"
import RiskChart from "./RiskChart.js"


function Invest() {
    const [risk, setRisk] = useState(50);

    const navigate = useNavigate();
    const [capital, setCapital] = useState(100);
    const [ROI, setROI] = useState(15.0);
    const [content,setContent] = useState("");
    const handleChange = (e) => {
        setRisk(e.target.value);
    };
    const getTrackColor = () => {
        const green = 'rgb(245, 245, 245,0)'; // Green color
        const blue = 'rgb(245, 245, 245,1)'; // Blue color

        return `linear-gradient(to right, ${green} ${risk}%, ${blue} ${risk}%)`;
    };
    const increaseROI = () => {
        setROI(prevROI => prevROI + 0.5);
    };

    const decreaseROI = () => {
        setROI(prevROI => prevROI - 0.5);
    };

    const increaseCapital = () => {
        setCapital(prevCapital => prevCapital + 10);
    };

    const decreaseCapital = () => {
        setCapital(prevCapital => prevCapital - 10);
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
            <img src={Revert} alt="Welcome" className='Revertbutton' onClick={() => navigate('/StartupInfo')}/>
            <p style={{fontSize:"7vw"}}> Invest in Uphasia</p>
        </div>
        
        <div className='AppWithHeaderContent'>

            <div className='StartupsInfoBlocks3'>
                <img src={U16_9} alt="Welcome"/>
                <h1>You are investing in Uphasia</h1>
                
                 <div className='InvestRatingBox'>
                    <h1>Investor's Offer</h1>
                    <div class="ValueSpanContainer">

                 
                    <div className='ValueSpan'>
                        <img src={minus} alt="Welcome" onClick={decreaseCapital}/>
                        <h1>{capital}K</h1>
                        <img src={plus} alt="Welcome" onClick={increaseCapital}/>
                    </div>
                    <h1>Investor's Expected ROI</h1>
                    <div className='ValueSpan'>
                        <img src={minus} alt="Welcome" onClick={decreaseROI}/>
                        <h1>{ROI}%</h1>
                        <img src={plus} alt="Welcome" onClick={increaseROI}/>
                    </div>
                    </div>
                    <h1>Investor's Evaluated Risk</h1>
                    <div>
                        <div className="volume-slider">
                            <img src={riskslider} alt="Welcome" /></div>
                        </div>
                        <div className='A-Slider'>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={risk}
                            className="slider"
                            id="mySlider"
                            onChange={handleChange}
                            style={{ background: getTrackColor() }}
                        />
                  
                        </div>
                        <h2>Why would you invest in this company</h2>
                        <div className="appleInputContainer2">
                          
                            <textarea
                            type="text"
                            className="appleInput2"
                            value={content}
                            onChange={handleContent}
                        
                            />
                        </div>
                        <button className='InvestButton' onClick={() => HandleInvest()} >INVEST</button>

                   
                    </div>
                
            </div>
           
        </div>
        

    </div>



  );
}

export default Invest;