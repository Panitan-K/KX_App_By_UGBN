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
  const [startupInfo,setStartupInfo] = useState({});
  const [ticketAmount,setTicketAmount] = useState(0);
  const [correct,setCorrect] = useState(false)


  useEffect(() => {
    
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

    const fetchStartup = async () => {
      try {
        const StartupCollectionRef = collection(db, 'Startup'); // Reference to 'Startup' collection
        const StartupquerySnapshot = await getDocs(StartupCollectionRef); // Query the collection and get snapshot
        
        if (!StartupquerySnapshot.empty) {
          const StartupData = StartupquerySnapshot.docs.find(doc => doc.id === 'S01'); // Find the document with ID 'S01'
          
          if (StartupData) {
            const Buffer = StartupData.data();
            setStartupInfo(Buffer)
            setTicketAmount(Buffer.ticketOwned.length)
            
            
      
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
    const checkupFundRaised = () => {
      //console.log("Checking Data ",startupInfo)
      //console.log("Startup Info.length",startupInfo.fundRaised)
      if (startupInfo.fundRaised !== undefined) {
        
        var ticketbalance = 0
        var startupFundraised = startupInfo.fundRaised 
        tickets.forEach((ticket, index) => {
          console.log(`Ticket ${index}: Capital = ${ticket.capital}, Investor Name = ${ticket.investorName}`);
          if (ticket.investorName !== null) {
            ticketbalance = ticketbalance + ticket.capital
          }

          if (ticketbalance === startupFundraised) {
            setCorrect(true)
          }

  
          console.log("I have this amount sold : " ,ticketbalance)

        });
        
      }
      else {  
        console.log("Refetching")
      }
      
    }
   
    fetchTickets(); // Call the fetchTickets function when component mounts
    fetchStartup();
    if (!correct) {
    checkupFundRaised();
    }
    
  }, [tickets,startupInfo,correct]);
   
return (

    <div className="App">
      <div className='static-bar'>
        <p style={{fontSize:"7vw"}}>Startup : {startupInfo.startupName}</p>
      </div>
        <div className='AppWithHeaderContent'>
      <div className='StartupsInfoBlocks3' >
          <img src={U16_9} alt="Welcome"/>
      </div>
    <div className='BalanceBox'>
        <p style={{ lineHeight: "1vh", fontSize: "10vw", marginBlockStart: "8vh",marginBlockEnd: "3vh" }}>Stake Remain</p>
        <p className='Cash' style={{  marginBlockStart: "0vh", marginBlockEnd: "2vh" }}>{startupInfo.stakeRemain}%</p>
        <span style={{ lineHeight: "0vh", marginBlockStart: "1vh", fontSize: "5vw" }}>
          <span>Total </span>
      
          <span style={{ color: '#079F16', fontWeight:"bold" }}>
            {startupInfo ? 20 - startupInfo.stakeRemain : 'N/A'}
          </span>
          <span style={{ color: '#079F16', fontWeight:"bold" }}>%</span>
          <span> Sold to </span>
          <span style={{ color: '#079F16', fontWeight:"bold" }  }>
            {startupInfo ? ticketAmount : 'N/A'}
          </span>
          <span> Investors</span>
        </span>
        <div>
          <span>Total Fund Raised : </span>
          <span>{startupInfo.fundRaised}</span>
        </div>
        
      </div>
      <button className='InvestButton' onClick={() => navigate('/CreateTicket',{StakeRemain : startupInfo.stakeRemain})} >Create Ticket</button>
      <div className="PortfolioBox" >
        <h1>Tickets</h1>
        
            {tickets.length > 0 ? (
            tickets.map(ticket => (
                <div key={ticket.TicketName} className='TicketBlocks'>
                    
          
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