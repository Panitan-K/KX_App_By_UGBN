import './css/App.css';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from "react-router-dom";
import U16_9 from "./image/logo/Uphasia.png";
import { db } from './Firebase';
import { collection, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore';

function Startup() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [startupInfo, setStartupInfo] = useState({});
  const [ticketAmount, setTicketAmount] = useState(0);
  const [Fund, setFund] = useState(0);

  const checkupFundRaised = useCallback((tickets, startupInfo) => {
    console.log("Checking Startup tickets", tickets, startupInfo);
    if (startupInfo.fundRaised !== undefined) {
      let ticketBalance = 0;
      let startupFundraised = startupInfo.fundRaised;
      tickets.forEach((ticket, index) => {
        console.log(`Ticket ${index}: Capital = ${ticket.capital}, Investor Name = ${ticket.investorName}`);
        if (ticket.investorName !== null) {
          ticketBalance += ticket.capital;
          console.log("Appending Capital")
        }

        console.log("Comparing Balance to Tickets")
        if (ticketBalance === startupFundraised) {
          setFund(ticketBalance);
        } else {
          console.log("ticket balance is not equal to store");
          console.log("ticket Balance", ticketBalance, "Store in DB", startupFundraised);
          executeFundupdate(ticketBalance);
          setFund(ticketBalance);
        }

        console.log("I have this amount sold: ", ticketBalance);
      });
    } else {
      console.log("Failed to get ticket data");
    }
  }, []);
  
  const executeFundupdate = async (UpdateFund) => {
    console.log("I will update this with ", UpdateFund, "K");

    const startupDocRef = doc(db, 'Startup', 'S01');
    const startupDocSnapshot = await getDoc(startupDocRef);
    if (startupDocSnapshot.exists()) {
      const Buffer = startupDocSnapshot.data();
      Buffer.fundRaised = UpdateFund;
      await updateDoc(startupDocRef, { fundRaised: Buffer.fundRaised });
    } else {
      console.error("Startup document with ID 'S01' not found.");
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tickets
        const ticketsCollectionRef = collection(db, 'tickets');
        const ticketsQuerySnapshot = await getDocs(ticketsCollectionRef);
        let ticketData = [];
        if (!ticketsQuerySnapshot.empty) {
          ticketData = ticketsQuerySnapshot.docs.map(doc => doc.data());
          setTickets(ticketData);
        } else {
          console.log("No documents found in 'tickets' collection.");
        }

        // Fetch startup info
        const startupCollectionRef = collection(db, 'Startup');
        let StartupBuffer = {};
        const startupQuerySnapshot = await getDocs(startupCollectionRef);
        if (!startupQuerySnapshot.empty) {
          const startupData = startupQuerySnapshot.docs.find(doc => doc.id === 'S01');
          if (startupData) {
            StartupBuffer = startupData.data();
            setStartupInfo(StartupBuffer);
            setTicketAmount(StartupBuffer.ticketOwned.length);
          } else {
            console.error("Startup document with ID 'S01' not found.");
          }
        } else {
          console.log("No documents found in 'Startup' collection.");
        }

        // Call checkupFundRaised after both fetches are complete
        checkupFundRaised(ticketData, StartupBuffer);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [checkupFundRaised]);

  

  return (
    <div className="App">
      <div className='static-bar'>
        <p style={{ fontSize: "7vw" }}>Startup: {startupInfo.startupName}</p>
      </div>
      <div className='AppWithHeaderContent'>
        <div className='StartupsInfoBlocks3'>
          <img src={U16_9} alt="Welcome" />
        </div>
        <div className='BalanceBox'>
          <p style={{ lineHeight: "1vh", fontSize: "10vw", marginBlockStart: "8vh", marginBlockEnd: "3vh" }}>Stake Remain</p>
          <p className='Cash' style={{ marginBlockStart: "0vh", marginBlockEnd: "2vh" }}>{startupInfo.stakeRemain}%</p>
          <span style={{ lineHeight: "0vh", marginBlockStart: "1vh", fontSize: "5vw" }}>
            <span>Total </span>
            <span style={{ color: '#079F16', fontWeight: "bold" }}>
              {isNaN(20 - startupInfo.stakeRemain) ? 'N/A' : 20 - startupInfo.stakeRemain}
            </span>
            <span style={{ color: '#079F16', fontWeight: "bold" }}>%</span>
            <span> Sold to </span>
            <span style={{ color: '#079F16', fontWeight: "bold" }}>
              {isNaN(ticketAmount) ? 'N/A' : ticketAmount}
            </span>
            <span> Investors</span>
          </span>
          <div>
            <span>Total Fund Raised: </span>
            <span style={{ color: '#079F16', fontWeight: "bold" }}>{isNaN(Fund) ? 'N/A' : Fund}</span>
            <span style={{ color: '#079F16', fontWeight: "bold" }}>K</span>
          </div>
        </div>
        <button className='InvestButton' onClick={() => navigate('/CreateTicket', { StakeRemain: startupInfo.stakeRemain })}>Create Ticket</button>
        <div className="PortfolioBox">
          <h1>Tickets</h1>
          {tickets.length > 0 ? (
            tickets.map(ticket => (
              <div key={ticket.ticketName} className='TicketBlocks'>
                <p>Ticket Name: {ticket.ticketName}</p>
                <p>Capital: {ticket.capital}</p>
                <p>Stake: {ticket.stake}</p>
                <p>
                  Investor Name: {ticket.investorName ? (
                    <span style={{ color: 'green' }}>{ticket.investorName}</span>
                  ) : (
                    <span style={{ color: 'red', fontWeight: 'bold' }}>Not Acquired</span>
                  )}
                </p>
              </div>
            ))
          ) : (
            <div className='TicketBlocks'>
              <p>No Tickets</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Startup;
