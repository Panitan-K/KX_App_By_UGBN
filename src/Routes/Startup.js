import './css/App.css';
import React, { useEffect, useState/*, useCallback*/ } from 'react';
import { /*useNavigate,*/ useLocation } from "react-router-dom";
import { db } from './Firebase';
import { collection, getDocs/*, getDoc, doc, updateDoc*/ } from 'firebase/firestore';
import Avatar from './Component/Avatar';
import InvestorBlockAvatar from './Component/InvestorBlockAvatar';
//import footer from "./image/Mock/Footer.png"
import { useNavigate } from "react-router-dom";
import FooterRocket from "./image/svg/rocket.png";
import FooterHouse from "./image/svg/house.png";
import FooterRevert from "./image/svg/Revert.png";
function Startup() {
  //const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [startupInfo, setStartupInfo] = useState({});
  //const [ticketAmount, setTicketAmount] = useState(0);
  const navigate = useNavigate();
  const [StartupID, setStartupID] = useState("");
  const location = useLocation();

  const refreshPage = () => {
    window.location.reload();
  };

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
            <h4>TOKENS FROM INVESTORS </h4>
            <button onClick={refreshPage} >Refresh</button>
          </div>

          {filteredTickets.length > 0 ? (
          filteredTickets.map(ticket => (
            <div key={ticket.id} className='TicketBlocks'>
        
               {ticket.startupName ? (
                  <InvestorBlockAvatar
                  imgLink= {ticket.InRef}
                  InvestorName={ticket.investorName}
                  Sector={ticket.investorCompany}
                />
                ) : (
                  <span style={{ color: 'red', fontWeight: 'bold' }}>Not Acquired</span>
                )}
         

            </div>
          ))
        ) : (
          <div className='TicketBlocks'>
            <p>No Investor </p>
          </div>
        )}
        <footer className="FooterNavBar">
          <img src={FooterRocket} alt="Footer" />
          <img src={FooterHouse} alt="Footer" />
          <img src={FooterRevert} alt="Footer" onClick={() =>navigate('/')} />
        </footer>
        </div>
    
    </div>
  );
}

export default Startup;
