import './css/App.css';
import React,{ useState } from 'react';
import { useNavigate } from "react-router-dom";
import U16_9 from "./image/Mock/Uphasia16_9.png"
import plus from "./image/svg/plusicon.png"
import minus from "./image/svg/minusicon.png"
import Revert from "./image/svg/Revert.png"
import riskslider from "./image/svg/RiskSlider.png"
//import RiskChart from "./RiskChart.js"


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
        const green = 'rgb(245, 0, 245,0)'; // Green color
        const blue = 'rgb(245, 0, 245,1)'; // Blue color

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
        
        <div className='AppWithHeaderContent2'>

            <div className='StartupsInfoBlocks3'>
                <img src={U16_9} alt="Welcome"/>
                <h1>You are investing in</h1>
                <h1> Uphasia</h1>
                
                <div className='Divisor'>

                <h1>Avaliable Tickets</h1>
                </div>


                <div className='OfferBox'>
                    
                    <div class="ValueSpanContainer">

                    <h1>Capital</h1>
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
                    <div className='Divisor'>
                        <h1>Startup Rating</h1>

                    </div>
                    <div className='RatingBox'>
                        
                    

                    <div className='OfferBox'>
                    <h1>Investor's Evaluated Risk</h1>
               
                    
                    </div>
                    <div class="ValueSpanContainer">
                    <h1>Investor's Expected ROI</h1>
                    <div className='ValueSpan'>
                        <img src={minus} alt="Welcome" onClick={decreaseROI}/>
                        <h1>{ROI}%</h1>
                        <img src={plus} alt="Welcome" onClick={increaseROI}/>
                    </div>
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