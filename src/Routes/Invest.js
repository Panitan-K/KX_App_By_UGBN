import './css/App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { db } from './Firebase'; 
import { doc, updateDoc } from 'firebase/firestore';
import Slider from './Component/Slider';

function Invest() {
    const navigate = useNavigate();
    const [xinvestorID, setInvestorID] = useState("");
    const location = useLocation();
    const [rating, setRating] = useState({
        risk: 5,
        marketSize: 5,
        businessPotential: 5,
        teamPotential: 5,
        techInnovation: 5,
        comment: "",
    });

    const handleSliderChange = (name, newValue) => {
        setRating((prevState) => ({
            ...prevState,
            [name]: newValue,
        }));
    };

    const handleCommentChange = (e) => {
        setRating((prevState) => ({
            ...prevState,
            comment: e.target.value,
        }));
    };

    useEffect(() => {
        console.log(location.state);
        if (location.state && location.state.ID) {
            setInvestorID(location.state.ID);
        }

        window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts
    }, [xinvestorID, location.state.ID, location.state.Startup]);

    const handleInvest = async () => {
        try {
            // Update the investorName field in the selected ticket document
            const ticketDocRef = doc(db, "tickets", location.state.newTicketId);
            await updateDoc(ticketDocRef, {
                rating: rating, // Append the rating to the ticket document
            });
            console.log("Investment successful!");
            navigate("/InvestorMain", { state: { ID: xinvestorID } });
        } catch (error) {
            console.error("Error updating document:", error);
        }

        navigate('/InvestorMain', { state: { ID: xinvestorID } });
    };

    return (
        <div className="App">
            <div className='static-bar'>
                <p style={{ fontSize: "7vw" }}> Invest in {location.state.Startup.startupName}</p>
            </div>

            <div className='AppWithHeaderContent2'>
                <div className='StartupsInfoBlocks3'>
                    <img src={location.state.Startup.imgSrc} alt="Welcome" />

                    <div className='Divisor'>
                        <h1>Feedback to Startup</h1>
                    </div>

                    <div className='Slider-Group'>
                        <Slider label="Risk" lowLabel="High Risk" highLabel="Low Risk" value={rating.risk} onChange={(newValue) => handleSliderChange('risk', newValue)} />
                        <Slider label="Market Size" lowLabel="Small Market Size" highLabel="Big Market Size" value={rating.marketSize} onChange={(newValue) => handleSliderChange('marketSize', newValue)} />
                        <Slider label="Business Potential" lowLabel="Receding" highLabel="Growing" value={rating.businessPotential} onChange={(newValue) => handleSliderChange('businessPotential', newValue)} />
                        <Slider label="Team Potential" lowLabel="Impotent" highLabel="Potent" value={rating.teamPotential} onChange={(newValue) => handleSliderChange('teamPotential', newValue)} />
                        <Slider label="Technology & Innovation" lowLabel="Uninventive" highLabel="Innovative" value={rating.techInnovation} onChange={(newValue) => handleSliderChange('techInnovation', newValue)} />
                    </div>
                    <div className='CommentSection'>
                        <textarea
                            value={rating.comment}
                            onChange={handleCommentChange}
                            placeholder="Add your comment here"
                            rows="4"
                            cols="50"
                        />
                    </div>

                    <button className='InvestButton' onClick={handleInvest}>Confirm</button>
                </div>
            </div>
        </div>
    );
}

export default Invest;
