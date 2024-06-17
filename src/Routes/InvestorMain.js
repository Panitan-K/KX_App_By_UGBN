import './css/App.css';
import React, { useEffect, useState } from 'react';
import PersonIcon from "./image/Mock/KL_Placeholder.jpeg";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from './Firebase'; // Assuming 'db' and other Firestore methods are exported from './Firebase'
import { collection, getDocs } from 'firebase/firestore';

function InvestorMain() {
  const navigate = useNavigate();
  const location = useLocation();
  const [tickets, setTickets] = useState([]);
  const [investorInfo, setInvestorInfo] = useState({});
  const [ticketAmount, setTicketAmount] = useState(0);

  useEffect(() => {
    const state = location.state || {};

    // Check if investorID exists in the state
    if (!state.investorID) {
      // If investorID is null or undefined, navigate to the login page
      navigate('/login');
      return; // Exit the effect early
    }

    const { investorID } = state;

    window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts
    console.log("Given Investor ID,", investorID);

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
          const InvestorData = InvestorquerySnapshot.docs.find(doc => doc.id === investorID); // Find the document with the given ID

          if (InvestorData) {
            const Buffer = InvestorData.data();
            setInvestorInfo(Buffer);
            setTicketAmount(Buffer.ticketOwned.length);
            console.log(Buffer);
          } else {
            console.error(`Investor document with ID '${investorID}' not found.`);
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
  }, [location.state, navigate]); // Dependency array with location.state and navigate to ensure navigation happens correctly

  console.log(tickets);

  // Filter tickets where investorName matches the investor's name
  const filteredTickets = tickets.filter(ticket => ticket.investorName === investorInfo.firstName);

  return (
    <div className="App">
      <div className='InvestorProfile'>
        <img src={PersonIcon} alt="Welcome" className='InvestorIcon' />
        <div className='InvestorNameBox'>
          <h2 style={{ lineHeight: "0.5vh" }}>{investorInfo.firstName}</h2>
          <h2>{investorInfo.lastName}</h2>
        </div>
      </div>

      <div className='BalanceBox'>
        <p style={{ lineHeight: "1vh", fontSize: "10vw", marginBlockStart: "8vh", marginBlockEnd: "3vh" }}>Account Balance</p>
        <p className='Cash' style={{ marginBlockStart: "0vh", marginBlockEnd: "2vh" }}>{investorInfo.balance} K</p>
        <span style={{ lineHeight: "0vh", marginBlockStart: "1vh", fontSize: "5vw" }}>
          <span>Total </span>
          <span style={{ color: '#079F16' }}> {150 - investorInfo.balance}K </span>
          <span>invested in </span>
          <span style={{ color: '#079F16', fontWeight: "bold" }}>{investorInfo ? ticketAmount : 'N/A'}</span>
          <span> Startups</span>
        </span>
      </div>

      <button className='InvestButton' onClick={() => navigate('/InvestList')}>INVEST NOW</button>

      <div className="PortfolioBox">
        <h1>Portfolio</h1>

        {filteredTickets.length > 0 ? (
          filteredTickets.map(ticket => (
            <div key={ticket.ticketName} className='TicketBlocks'>
              <p>
                Startup Name: {ticket.startupName ? (
                  <span style={{ color: 'green', fontWeight: 'bold' }}>{ticket.startupName}</span>
                ) : (
                  <span style={{ color: 'red', fontWeight: 'bold' }}>Not Acquired</span>
                )}
              </p>
              <p>Ticket Name: {ticket.ticketName}</p>
              <p>Capital: {ticket.capital}</p>
              <p>Stake: {ticket.stake}</p>
            </div>
          ))
        ) : (
          <div className='TicketBlocks'>
            <p>No Tickets</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default InvestorMain;
