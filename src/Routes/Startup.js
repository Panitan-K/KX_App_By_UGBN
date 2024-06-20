import './css/App.css';
import React, { useEffect, useState/*, useCallback*/ } from 'react';
import { /*useNavigate,*/ useLocation } from "react-router-dom";
import { db } from './Firebase';
import { collection, getDocs/*, getDoc, doc, updateDoc*/ } from 'firebase/firestore';
import Avatar from './Component/Avatar';
import StartupBlockAvatar from './Component/StartupBlockAvatar';
import footer from "./image/Mock/Footer.png"
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
          const startupData = startupQuerySnapshot.docs.find(doc => doc.id === /*StartupID*/ "S01");
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
      
    
        <h1>Profile</h1>
      <Avatar name={startupInfo.startupName} 
          avatarUrl={startupInfo.imgSrc} 
        />
      
   
        <div className='PortfolioBox'>
          <h4>TOKEN BALANCE</h4>
          </div>
          <div className='BalanceBox'>
            <p className='Cash2' >{startupInfo.fundRaised} </p>
          </div>
        <div className="PortfolioBox">
          <div className='PortfolioHead'>
            <h4>COMPANY GOT YOUR TOKEN</h4>
            <button>View all</button>
          </div>

          {filteredTickets.length > 0 ? (
          filteredTickets.map(ticket => (
            <div key={ticket.id} className='TicketBlocks'>
        
               {ticket.startupName ? (
                  <StartupBlockAvatar
                  imgLink= {ticket.InRef}
                  StartupName={ticket.investorName}
                  Sector={ticket.investorCompany}
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
        <img src={footer} alt="Footer" />
      </footer>
        </div>
    
    </div>
  );
}

export default Startup;
