import './css/App.css';
import React, { useEffect, useState/*, useCallback*/ } from 'react';
import { /*useNavigate,*/ useLocation } from "react-router-dom";
import { db } from './Firebase';
import { collection, getDocs/*, getDoc, doc, updateDoc*/ } from 'firebase/firestore';

function Startup() {
  //const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [startupInfo, setStartupInfo] = useState({});
  //const [ticketAmount, setTicketAmount] = useState(0);

  const [StartupID, setStartupID] = useState("");
  const location = useLocation();

  
  useEffect(() => {
    setStartupID(location.state.ID);
  }, [location.state.ID]); // This effect runs only when location.state.ID changes

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tickets
        const ticketsCollectionRef = collection(db, 'tickets');
        const ticketsQuerySnapshot = await getDocs(ticketsCollectionRef);
        if (!ticketsQuerySnapshot.empty) {
          const ticketData = ticketsQuerySnapshot.docs.map(doc => doc.data());
          setTickets(ticketData);
        }

        // Fetch startup info
        const startupCollectionRef = collection(db, 'Startup');
        const startupQuerySnapshot = await getDocs(startupCollectionRef);
        console.log("This is StartupID: ", StartupID);
        if (!startupQuerySnapshot.empty) {
          const startupData = startupQuerySnapshot.docs.find(doc => doc.id === StartupID);
          if (startupData) {
            const StartupBuffer = startupData.data();
            setStartupInfo(StartupBuffer);
          } else {
            console.error("Startup document not found.");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [StartupID]); // This effect runs only when StartupID changes
  const filteredTickets = tickets.filter(ticket => ticket.startupName === startupInfo.startupName);



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
        <p className='Cash' >{startupInfo.fundRaised}</p>
          <p style={{ lineHeight: "1vh", fontSize: "10vw", marginBlockStart: "8vh", marginBlockEnd: "3vh" }}>Token Received</p>
          
          
    
        </div>
     
        <div className="PortfolioBox">
          <h1>Invested by</h1>
          {filteredTickets.length > 0 ? (
            filteredTickets.map(ticket => (
              <div key={ticket.ticketName} className='TicketBlocks'>
             
            
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
