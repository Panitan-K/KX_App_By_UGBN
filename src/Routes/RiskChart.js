import './css/Chart.css';
import React, { useState } from 'react';

import riskslider from "./image/svg/RiskSlider.png";

function RiskChart() {
    const [risk, setRisk] = useState(50);
  

    const handleChange = (event) => {
        setRisk(event.target.value);
    };


    const getTrackColor = () => {
        const green = 'rgba(245, 245, 245, 0)'; // Green color with alpha 0
        const blue = 'rgba(245, 245, 245, 1)'; // Blue color with alpha 1

        return `linear-gradient(to right, ${green} ${risk}%, ${blue} ${risk}%)`;
    };

    return (
        <div>
            <h1>Investor's Evaluated Risk</h1>
            <div className="risk-chart-container">
            <div>
                <div className="volume-slider">
                    <img src={riskslider} alt="Risk Slider" />
                </div>
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
        </div>
            
        </div>
    );
}

export default RiskChart;
