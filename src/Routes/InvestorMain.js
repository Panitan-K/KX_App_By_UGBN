import './css/App.css';
import React, { useEffect, useState } from 'react';
//import PersonIcon from "./image/Mock/KL_Placeholder.jpeg";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from './Firebase'; // Assuming 'db' and other Firestore methods are exported from './Firebase'
import { collection, getDocs } from 'firebase/firestore';
import Avatar from './Component/Avatar';
import StartupBlockAvatar from './Component/StartupBlockAvatar';
//import footer from "./image/Mock/Footer.png"
import FooterRocket from "./image/svg/rocket.png";
import FooterHouse from "./image/svg/house.png";
import FooterRevert from "./image/svg/Revert.png";

function InvestorMain() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tickets, setTickets] = useState([]);
  const [investorInfo, setInvestorInfo] = useState({});
  const [ticketAmount, setTicketAmount] = useState(0);
  const [xinvestorID,setInvestorID] = useState("");

  useEffect(() => {  
    
    //console.log("this is state",state)
    setInvestorID(location.state.ID)
    //console.log("xInvestorID ",xinvestorID)

    // Check if investorID exists in the state

    /*if (xinvestorID === null) {
      // If investorID is null or undefined, navigate to the login page
      navigate('/login');
      return; // Exit the effect early
    }*/

   
    window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts
    console.log("Given Investor ID,", xinvestorID);

    const fetchTickets = async () => {
      try {
        const ticketsCollectionRef = collection(db, 'tickets'); // Reference to 'tickets' collection
        const querySnapshot = await getDocs(ticketsCollectionRef); // Query the collection and get snapshot

        if (!querySnapshot.empty) {
          const ticketData = querySnapshot.docs.map(doc => doc.data()); // Map document data to array
          setTickets(ticketData); // Set state with ticket data
          
        } else {
          console.log("No documents found in 'tickets' collection.");
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    const fetchInvestor = async () => {
      try {
        const InvestorCollectionRef = collection(db, 'Investor'); // Reference to 'Investor' collection
        const InvestorquerySnapshot = await getDocs(InvestorCollectionRef); // Query the collection and get snapshot

        if (!InvestorquerySnapshot.empty) {
          const InvestorData = InvestorquerySnapshot.docs.find(doc => doc.id === xinvestorID); // Find the document with the given ID

          if (InvestorData) {
            const Buffer = InvestorData.data();
            setInvestorInfo(Buffer);
            
            console.log("This is Buffer : " ,Buffer);
          } else {
            console.error(`Investor document with ID '${xinvestorID}' not found.`);
          }
        } else {
          console.log("No documents found in 'Investor' collection.");
        }
      } catch (error) {
        console.error('Error fetching investor data:', error);
      }
    };

    fetchTickets(); // Call the fetchTickets function when component mounts
    fetchInvestor();
    
  }, [location.state, navigate, xinvestorID]); // Dependency array with location.state and navigate to ensure navigation happens correctly

  //console.log(tickets);

  // Filter tickets where investorName matches the investor's name
  const filteredTickets = tickets.filter(ticket => ticket.investorName === investorInfo.firstName +" "+ investorInfo.lastName);
  useEffect(() => {
    console.log(filteredTickets)
    const uniqueStartupNames = new Set(filteredTickets.map(ticket => ticket.startupName));
    setTicketAmount(uniqueStartupNames.length);
    console.log(ticketAmount);

  },[filteredTickets, ticketAmount])
  

// Get the count of unique startup names
if (!investorInfo.firstName || !investorInfo.lastName) {
  return <div>Loading ... </div>;
}
console.log(tickets)
console.log(ticketAmount);
//const formattedLastName = investorInfo.lastName.length > 1 ? `${investorInfo.lastName.charAt(0)}.` : <h2 style={{ lineHeight: "0.5vh" }}>{investorInfo.lastName}</h2>;

  
  return (
    <div className="App">
       <h3>Pay & Send</h3>
          <Avatar name={investorInfo.firstName +" "+ investorInfo.lastName} 
          avatarUrl={investorInfo.imgSrc} 
          company={investorInfo.organization} />

      <div className='PortfolioBox'>
        <div className='PortfolioHead'>
        <h4>TOKEN BALANCE</h4>
        </div>
      </div>
      <div className='BalanceBox'>
        <p className='Cash2' >{investorInfo.balance} </p>
      </div>

      <button className='InvestButton' onClick={() => navigate('/InvestList',{ state : { ID : xinvestorID , InvestorInfo : investorInfo}})}>Send Token</button>

      <div className="PortfolioBox">
        <div className='PortfolioHead'>
        <h4>COMPANY GOT YOUR TOKEN</h4>
        <button>View all</button>
        </div>

       
      </div>
      {filteredTickets.length > 0 ? (
          filteredTickets.map(ticket => (
            <div key={ticket.id} className='TicketBlocks'>
        
               {ticket.startupName ? (
                  <StartupBlockAvatar
                  imgLink= {ticket.StRef}
                  StartupName={ticket.startupName}
                  Sector={ticket.sector}
                />
                ) : (
                  <span style={{ color: 'red', fontWeight: 'bold' }}>Not Acquired</span>
                )}
         

            </div>
          ))
        ) : (
          <div className='TicketBlocks'>
            <p>No Startups Invested</p>
          </div>
        )}
      <footer className="FooterNavBar">
        <img src={FooterRocket} alt="Footer" onClick={() => navigate('/InvestList',{ state : { ID : xinvestorID , InvestorInfo : investorInfo}})}  />
        <img src={FooterHouse} alt="Footer" onClick={() =>navigate('/InvestorMain', { state: { ID: xinvestorID } })}/>
        <img src={FooterRevert} alt="Footer" />
      </footer>
    </div>
  );
}

export default InvestorMain;
