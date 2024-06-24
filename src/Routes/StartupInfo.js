import './css/App.css';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
//import Revert from "./image/svg/Revert.png";
import { db } from './Firebase'; 
import { collection, doc, setDoc, getDocs, arrayUnion, updateDoc, increment } from 'firebase/firestore';
//import footer from "./image/Mock/Footer.png"
import FooterRocket from "./image/svg/rocket.png";
import FooterHouse from "./image/svg/house.png";
import FooterRevert from "./image/svg/Revert.png";
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
    if (location.state.InvestorInfo.InvestorInfo.balance <= 0 ) {
        alert("You have no token left")
      } 
    else {

    
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
          <p>What we are looking for : 100,000 USD Investment </p>
        </div>
        <div className='StartupsInfoBlocks2'>
          
          <img src={startup.productSrc} alt="Welcome"/>
          <div className="appleInputContainer">
                    <label className="appleInputLabel">Introduction</label>
                    <textarea
                      type="text"
                      className="appleInput"
                      value={"We are Uphasia—the solution for communication disorders in the Thai dialect. As we are aging , dementia becomes inevitable. Dementia or any damage to the brain cause a person to lose the ability to comprehend and produce speech, which degrades their well-being.The traditional solution is for Speech-Language Pathologists (SLPs) to provide rehabilitation to improve or delay the speech condition. However, the availability of SLPs in Thailand is limited to 200 SLPs for 600,000 patients, resulting in a ratio of 1 to 3,000.Uphasia digitalize the speech rehabilitation process through an online platform that would allow everyone using the Thai dialect to access rehabilitation utilizing  ASR technology, which we will further co-develop with the only SLP school in Thailand, Ramathibodi Hospital."}
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
      <footer className="FooterNavBar">
        <img src={FooterRocket} alt="Footer" onClick={() => navigate('/InvestList',{ state : { ID : xinvestorID , InvestorInfo : location.state.InvestorInfo.InvestorInfo}})}/>
        <img src={FooterHouse} alt="Footer" onClick={() => navigate('/InvestorMain',{ state : { ID : xinvestorID}})}/>
        <img src={FooterRevert} alt="Footer" onClick={() => navigate('/InvestList',{ state : { ID : xinvestorID , InvestorInfo : location.state.InvestorInfo.InvestorInfo}})}/>
      </footer>
    </div>
  );
}

export default StartupInfo;
