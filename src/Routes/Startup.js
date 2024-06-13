import './css/App.css';
import React,{useEffect,useState} from 'react';
//import PersonIcon from "./image/Mock/KL_Placeholder.jpeg"
//import InvestorIcon from "./image/svg/Person_Vector.svg"
import { useNavigate} from "react-router-dom";
import U16_9 from "./image/logo/Uphasia.png"
import { db } from './Firebase'; // Assuming 'db' and other Firestore methods are exported from './Firebase'
import {  collection, getDocs, /*doc, getDoc*/ } from 'firebase/firestore';


function Startup() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

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
  
    fetchTickets(); // Call the fetchTickets function when component mounts
    
  }, []);
  
return (

    <div className="App">
      <div className='static-bar'>
        <p style={{fontSize:"7vw"}}>Startup : Uphasia</p>
      </div>
        <div className='AppWithHeaderContent'>
      <div className='StartupsInfoBlocks3' >
          <img src={U16_9} alt="Welcome"/>
      </div>
    <div className='BalanceBox'>
        <p style={{ lineHeight: "1vh", fontSize: "10vw", marginBlockStart: "8vh",marginBlockEnd: "3vh" }}>Stake Remain</p>
        <p className='Cash' style={{  marginBlockStart: "0vh", marginBlockEnd: "2vh" }}>20%</p>
        <span style={{ lineHeight: "0vh", marginBlockStart: "1vh", fontSize: "5vw" }}>
          <span>Total </span>
          <span style={{ color: '#079F16' }}> 0% </span>
          <span>Sold to </span>
          <span style={{ color: '#079F16' }}>0</span>
          <span> Investors</span>
        </span>
      </div>
      <button className='InvestButton' onClick={() => navigate('/CreateTicket')} >Create Ticket</button>
      <div className="PortfolioBox" >
        <h1>Tickets</h1>
        <ul className='TicketBlocks'>
          {tickets.map(ticket => (
            <li key={ticket.id}> {/* Assuming 'id' is a unique identifier for each ticket */}
              <p>Investor Name: {ticket.InvestorName}</p>
              <p>Startup Name: {ticket.StartupName}</p>
              <p>Ticket Name: {ticket.TicketName}</p>
              <p>Capital: {ticket.capital}</p>
              <p>Stake: {ticket.stake}</p>
            </li>
          ))}
        </ul>
      </div>
      </div> 
    </div>



  );
}

export default Startup;