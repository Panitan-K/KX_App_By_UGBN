import './css/App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { db } from './Firebase'; 
import { doc, updateDoc } from 'firebase/firestore';
import Slider2 from './Component/Slider2';

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
    }, [xinvestorID, location.state]);

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
            <div class="Infoheader2"> 
                <h2>Write something to startup</h2>
            </div>
            <div className='AppWithHeaderContent2'>
                
                <div className='StartupsInfoBlocks3'>
                  

             
                    <div className='Slider-Group'>
                        <Slider2 label="TECHNOLOGY" sublabel="The innovativeness of this startup" lowLabel="Common" highLabel="Innovative" value={rating.techInnovation} onChange={(newValue) => handleSliderChange('techInnovation', newValue)} />
                        <Slider2 label="MARKET SIZE" sublabel="Estimate market size" lowLabel="Small Market Size" highLabel="Big Market Size" value={rating.marketSize} onChange={(newValue) => handleSliderChange('marketSize', newValue)} />
                        <Slider2 label="TEAM" sublabel="Team Potential" lowLabel="Impotent" highLabel="Potent" value={rating.teamPotential} onChange={(newValue) => handleSliderChange('teamPotential', newValue)} />
                        <Slider2 label="SCALABILITY" sublabel="Is it Scalable?" lowLabel="Limiting" highLabel="Scalable" value={rating.businessPotential} onChange={(newValue) => handleSliderChange('businessPotential', newValue)} />
                     </div>
                    <div className='CommentSection'>
                        <p>Suggestion</p>
                        <textarea
                            value={rating.comment}
                            onChange={handleCommentChange}
                            placeholder="Add your comment here"
                            rows="4"
                            cols="50"
                            className='appleInput2'
                        />
                    </div>

                    <button className='InvestButton2' onClick={handleInvest}>Submit & Send Token</button>
                </div>
            </div>
        </div>
    );
}

export default Invest;
