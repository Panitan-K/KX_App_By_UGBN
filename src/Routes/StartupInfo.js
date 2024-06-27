import './css/App.css';
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { db } from './Firebase'; 
import { collection, doc, setDoc, getDocs, arrayUnion, updateDoc, increment } from 'firebase/firestore';
import FooterRocket from "./image/svg/rocket.png";
import FooterHouse from "./image/svg/house.png";
import FooterRevert from "./image/svg/Revert.png";
import AlertBox from './Component/AlertBox'; // Import the AlertBox component

function StartupInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [xinvestorID, setInvestorID] = useState("");
  const [startup, setStartup] = useState({
    startupName: '',
    imgSrc: '',
    industry: '',
    stage: '',
    introduction: '',
    productSrc: '',
    des: '', // Ensure this field is present
  });

  const textAreaRef = useRef(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage button disable

  const [alertVisible, setAlertVisible] = useState(false); // State to manage alert visibility
  const [alertTopic, setAlertTopic] = useState(''); // State to manage alert topic
  const [alertContent, setAlertContent] = useState(''); // State to manage alert content

  useEffect(() => {
    if (location.state) {
      setInvestorID(location.state.ID);
      setStartup(location.state.Startup);
      console.log(location.state)
    }
    window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts
  }, [location.state]);

  useEffect(() => {
    if (textAreaRef.current) {
      autoResizeTextArea(textAreaRef.current);
    }
  }, [startup.des]);

  const autoResizeTextArea = (textarea) => {
    textarea.style.height = 'auto'; // Reset height
    textarea.style.height = textarea.scrollHeight + 'px'; // Set height to fit content
  };

  const handleTokenInvest = async () => {
    if (isSubmitting) {
      return; // Prevent double submission
    }

    setIsSubmitting(true); // Disable button to prevent double click

    if (location.state.InvestorInfo.InvestorInfo.balance <= 0) {
      setAlertTopic('Insufficient Token');
      setAlertContent('You have no token remaining');
      setAlertVisible(true); // Show the alert
      setIsSubmitting(false); // Re-enable button
      return;
    }

    const startupNameToCheck = startup.startupName;
    const isInStartupList = location.state.startuplist.some(item => item.name === startupNameToCheck)
    console.log(isInStartupList)
    if (isInStartupList) {
      
      setAlertTopic('Already Voted');
      setAlertContent('You have voted for '+startupNameToCheck+ ' already');
      setAlertVisible(true); // Show the alert
      setIsSubmitting(false); // Re-enable button
      return;
    }
    const newTicket = {
      sector: startup.industry,
      startupName: startup.startupName,
      investorName: location.state.InvestorInfo.InvestorInfo.firstName + " " + location.state.InvestorInfo.InvestorInfo.lastName,
      InRef: location.state.InvestorInfo.InvestorInfo.imgSrc,
      StRef: startup.imgSrc,
      investorCompany: location.state.InvestorInfo.InvestorInfo.organization
    };

    try {
      const ticketsCollectionRef = collection(db, "tickets");
      const ticketsSnapshot = await getDocs(ticketsCollectionRef);
      const ticketCount = ticketsSnapshot.size;
      const newTicketId = `Ticket_No${ticketCount + 1}`;
      const ticketDocRef = doc(db, "tickets", newTicketId);
      await setDoc(ticketDocRef, newTicket);

      const InvestorDocRef = doc(db, "Investor", xinvestorID);
      await updateDoc(InvestorDocRef, {
        ticketOwned: arrayUnion(newTicketId),
        balance: increment(-1)
      });

      const StartupDocRef = doc(db, "Startup", location.state.Startup.id);
      await updateDoc(StartupDocRef, {
        ticketOwned: arrayUnion(newTicketId),
        fundRaised: increment(1)
      });

      navigate('/Invest', { state: { ...location.state, newTicketId } });

    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setIsSubmitting(false); // Re-enable button in case of error
    }
  };

  return (
    <div className="App" style={{ backgroundColor: "white" }}>
      <div className='AppWithHeaderContent'>
        <div className="Infoheader">
          <h2>{startup.startupName}</h2>
          <p>Stage: {startup.stage}</p>
          <p>What we are looking for: 100,000 USD Investment</p>
        </div>
        <div className='StartupsInfoBlocks2'>
          <img src={startup.productSrc} alt="Welcome" />
          <div className="appleInputContainer">
            <label className="appleInputLabel">Introduction</label>
            <textarea
              type="text"
              className="appleInput"
              value={startup.des}
              readOnly
              ref={textAreaRef}
              onChange={(e) => autoResizeTextArea(e.target)} // Attach resize function
            />
          </div>
          <button 
            className='InvestButton2' 
            onClick={() => handleTokenInvest()}
            disabled={isSubmitting} // Disable button when submitting
          >
            {isSubmitting ? 'Submitting...' : 'Give Feedback & Send Token'}
          </button>
        </div>
      </div>
      <footer className="FooterNavBar">
        <img src={FooterRocket} alt="Footer" onClick={() => navigate('/InvestList', { state: { ID: xinvestorID, InvestorInfo: location.state.InvestorInfo.InvestorInfo, startuplist: location.state.startuplist } })} />
        <img src={FooterHouse} alt="Footer" onClick={() => navigate('/InvestorMain', { state: { ID: xinvestorID } })} />
        <img src={FooterRevert} alt="Footer" onClick={() => navigate('/InvestList', { state: { ID: xinvestorID, InvestorInfo: location.state.InvestorInfo.InvestorInfo, startuplist: location.state.startuplist} })} />
      </footer>
      {alertVisible && (
        <AlertBox
          alertTopic={alertTopic}
          alertContent={alertContent}
          onClose={() => setAlertVisible(false)} // Close the alert
        />
      )}
    </div>
  );
}

export default StartupInfo;
