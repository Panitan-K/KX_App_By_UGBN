import './css/App.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
//import Revert from "./image/svg/Revert.png";
import { db } from './Firebase'; 
import { collection, doc, setDoc, getDocs, arrayUnion, updateDoc, increment } from 'firebase/firestore';

function StartupInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [xinvestorID, setInvestorID] = useState("");
  const [startup, setStartup] = useState({
    startupName: '',
    imgSrc: '',
    industry: '',
    stage: '',
    introduction: ''
  });

  useEffect(() => {
    console.log(location.state)
    //console.log(location.state.InvestorInfo.InvestorInfo.firstName + location.state.InvestorInfo.InvestorInfo.lastName)
    if (location.state) {
      setInvestorID(location.state.ID);
      setStartup(location.state.Startup);
    }
    window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts
  }, [location.state]);


  const handleTokenInvest = async () => {
    const newTicket = {
      sector:startup.industry ,
      startupName: startup.startupName,
      investorName: location.state.InvestorInfo.InvestorInfo.firstName + location.state.InvestorInfo.InvestorInfo.lastName,
      InRef : location.state.InvestorInfo.InvestorInfo.imgSrc,
      StRef : startup.imgSrc,
      investorCompany : location.state.InvestorInfo.InvestorInfo.organization
    }
    
    try {
      // Get the reference to the "tickets" collection
      const ticketsCollectionRef = collection(db, "tickets");

      // Get all documents in the "tickets" collection
      const ticketsSnapshot = await getDocs(ticketsCollectionRef);

      // Get the count of existing documents
      const ticketCount = ticketsSnapshot.size;

      // Generate the new document ID
      const newTicketId = `Ticket_No${ticketCount + 1}`;

      // Create a reference to the new document
      const ticketDocRef = doc(db, "tickets", newTicketId);

      // Set the new ticket in the "tickets" collection with the generated ID
      await setDoc(ticketDocRef, newTicket);
      console.log("Document written with ID: ", newTicketId);

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



      console.log("I will send the Ticket ID : " , newTicketId)
      // Redirect to another page after creating the ticket
      navigate('/Invest', { state: { ...location.state, newTicketId } });
      
  } catch (error) {
      console.error("Error adding document: ", error);
  }

    /*const ticketDocRef = doc(db, "tickets", selectedTicket.id);
    await updateDoc(ticketDocRef, {
      investorName: investorInfo.firstName + investorInfo.lastName, // Update with the desired investor name
    });

    const InvestorDocRef = doc(db, "Investor", xinvestorID);

    await updateDoc(InvestorDocRef, {
        balance: investorInfo.balance - selectedTicket.capital,
        ticketOwned: arrayUnion(selectedTicket.id)
    });  */         
    console.log(startup)
    console.log(location.state)
    //navigate('/Invest', { state: { ID: xinvestorID, Startup: startup } })
  }
  /*
              <tr>
                <td>Startup</td>
                <td>:</td>
                <td>{startup.startupName}</td>
              </tr>
              <tr>
                <td>Industry</td>
                <td>:</td>
                <td>{startup.industry}</td>
              </tr>
              <tr>
                <td>Stage</td>
                <td>:</td>
                <td>{startup.stage}</td>
              </tr>*/
  return (
    <div className="App" style={{backgroundColor:"white"}}>
   
      
      <div className='AppWithHeaderContent'>
      <div class="Infoheader">
          <h2>{startup.startupName}</h2>
          <p>Stage : {startup.stage}</p>
          <p>What we are looking for ..... </p>
        </div>
        <div className='StartupsInfoBlocks2'>
          
          <img src={startup.imgSrc} alt="Welcome"/>
          <div className="appleInputContainer">
                    <label className="appleInputLabel">Area/Sector</label>
                    <textarea
                      type="text"
                      className="appleInput"
                      value={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"}
                      readOnly
                    />
                  </div>
          
          <button 
            className='InvestButton2' 
            onClick={() => handleTokenInvest() }
          >
            Give Feedback & Send Token
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartupInfo;
