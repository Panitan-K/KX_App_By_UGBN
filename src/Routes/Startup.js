import './css/App.css';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { db } from './Firebase';
import { collection, getDocs, getDoc, doc, updateDoc } from 'firebase/firestore';

function Startup() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [startupInfo, setStartupInfo] = useState({});
  const [ticketAmount, setTicketAmount] = useState(0);
  const [Fund, setFund] = useState(0);
  const [StartupID, setStartupID] = useState("");
  const location = useLocation();

  const CreateTicketNavigate = () =>{
    console.log("CreateTicketNavigate",startupInfo)
    navigate('/CreateTicket', {state : { StakeRemain: startupInfo.stakeRemain, StartupName : startupInfo.startupName, StartupID: StartupID }})
  }
  const executeFundupdate = useCallback(async (UpdateFund) => {
    const startupDocRef = doc(db, 'Startup', StartupID);
    const startupDocSnapshot = await getDoc(startupDocRef);
    if (startupDocSnapshot.exists()) {
      const Buffer = startupDocSnapshot.data();
      Buffer.fundRaised = UpdateFund;
      await updateDoc(startupDocRef, { fundRaised: Buffer.fundRaised });
    } else {
      console.error("Startup document not found.");
    }
  }, [StartupID]);


  const checkupFundRaised = useCallback((tickets, startupInfo) => {
    if (startupInfo.fundRaised !== undefined) {
      let ticketBalance = 0;
      let startupFundraised = startupInfo.fundRaised;
      tickets.forEach((ticket, index) => {
        if (ticket.investorName !== null) {
          ticketBalance += ticket.capital;
        }

        if (ticketBalance === startupFundraised) {
          setFund(ticketBalance);
        } else {
          executeFundupdate(ticketBalance);
          setFund(ticketBalance);
        }
      });
    }
  }, [executeFundupdate]);

  
  useEffect(() => {
    setStartupID(location.state.ID);
    
    const fetchData = async () => {
      try {
        // Fetch tickets
        const ticketsCollectionRef = collection(db, 'tickets');
        const ticketsQuerySnapshot = await getDocs(ticketsCollectionRef);
        let ticketData = [];
        if (!ticketsQuerySnapshot.empty) {
          ticketData = ticketsQuerySnapshot.docs.map(doc => doc.data());
          setTickets(ticketData);
        }

        // Fetch startup info
        const startupCollectionRef = collection(db, 'Startup');
        const startupQuerySnapshot = await getDocs(startupCollectionRef);
        console.log("This is StartupID: " ,StartupID)
        if (!startupQuerySnapshot.empty) {
          const startupData = startupQuerySnapshot.docs.find(doc => doc.id === location.state.ID);
          if (startupData) {
            const StartupBuffer = startupData.data();
            setStartupInfo(StartupBuffer);
            //setTicketAmount(StartupBuffer.ticketOwned.length);
          } else {
            console.error("Startup document not found.");
          }
        }

        checkupFundRaised(ticketData, startupInfo);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [checkupFundRaised, location.state,StartupID,startupInfo]);

  const filteredTickets = tickets.filter(ticket => ticket.startupName === startupInfo.startupName);

  useEffect(() => {
    console.log(filteredTickets)
    const uniqueStartupNames = new Set(filteredTickets.map(ticket => ticket.investorName));
    setTicketAmount(uniqueStartupNames.size-1);
    console.log(ticketAmount);

  },[filteredTickets, ticketAmount])
  return (
    <div className="App">
      <div className='static-bar'>
        <p style={{ fontSize: "7vw" }}>Startup: {startupInfo.startupName}</p>
      </div>
      <div className='AppWithHeaderContent'>
        <div className='StartupsInfoBlocks3'>
          <img src={startupInfo.imgSrc} alt="Welcome" />
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
        <button className='InvestButton' onClick={() => CreateTicketNavigate()}>Create Ticket</button>
        <div className="PortfolioBox">
          <h1>Tickets</h1>
          {filteredTickets.length > 0 ? (
            filteredTickets.map(ticket => (
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
