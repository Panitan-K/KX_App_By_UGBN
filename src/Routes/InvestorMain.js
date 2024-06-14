import './css/App.css';
import React, { useEffect, useState } from 'react';
import PersonIcon from "./image/Mock/KL_Placeholder.jpeg";
import { useNavigate } from "react-router-dom";
import { db } from './Firebase'; // Assuming 'db' and other Firestore methods are exported from './Firebase'
import { collection, getDocs } from 'firebase/firestore';

function InvestorMain() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [investorInfo, setInvestorInfo] = useState({});
  const [ticketAmount, setTicketAmount] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts

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
        const InvestorCollectionRef = collection(db, 'Investor'); // Reference to 'Startup' collection
        const InvestorquerySnapshot = await getDocs(InvestorCollectionRef); // Query the collection and get snapshot
        
        if (!InvestorquerySnapshot.empty) {
          const InvestorData = InvestorquerySnapshot.docs.find(doc => doc.id === 'IN01'); // Find the document with ID 'S01'
          
          if (InvestorData) {
            const Buffer = InvestorData.data();
            setInvestorInfo(Buffer);
            setTicketAmount(Buffer.ticketOwned.length);
            console.log(Buffer);
          } else {
            console.error("Startup document with ID 'S01' not found.");
          }
        } else {
          console.log("No documents found in 'Startup' collection.");
        }
      } catch (error) {
        console.error('Error updating startup data:', error);
      }
    };
  
    fetchTickets(); // Call the fetchTickets function when component mounts
    fetchInvestor();
  }, []);

  console.log(tickets);

  // Filter tickets where investorName is "Kriangkai"
  const filteredTickets = tickets.filter(ticket => ticket.investorName === "Kriangkai");

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
          <span style={{ color: '#079F16', fontWeight:"bold" }}>{investorInfo ? ticketAmount : 'N/A'}</span>
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
