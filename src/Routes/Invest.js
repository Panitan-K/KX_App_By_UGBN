import './css/App.css';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
//import U16_9 from "./image/logo/Uphasia.png";
import Revert from "./image/svg/Revert.png";
import { db } from './Firebase'; 
import { collection, doc, updateDoc, getDocs, arrayUnion } from 'firebase/firestore';

function Invest() {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState(null); // State for selected ticket
    const navigate = useNavigate();
    const [content, setContent] = useState("");
    const [investorInfo,setInvestorInfo] = useState({});
    const [ticketAmount,setTicketAmount] = useState(0);
    const [xinvestorID,setInvestorID] = useState("")
    const [xStartup,setStartup] = useState("")
    const location = useLocation();
    const handleContent = (e) => {
        setContent(e.target.value);
    }

    useEffect(() => {

        const balanceBox = document.querySelector('.BalanceBox');
        if (balanceBox) {
        balanceBox.scrollIntoView({  block: 'start' });
        }
        console.log("This is what is sent",location.state.Startup.image)
        setInvestorID(location.state.ID)
        setStartup(location.state.Startup)
        //console.log(xinvestorID)
        window.scrollTo(0, 1000); // Scrolls to the top of the page when component mounts

        const fetchTickets = async () => {
            try {
                const ticketsCollectionRef = collection(db, 'tickets'); // Reference to 'tickets' collection
                const querySnapshot = await getDocs(ticketsCollectionRef); // Query the collection and get snapshot
                if (!querySnapshot.empty) {
                    const ticketData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Include ID with data
                    setTickets(ticketData); // Set state with ticket data including IDs
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
                const InvestorData = InvestorquerySnapshot.docs.find(doc => doc.id === xinvestorID); // Find the document with ID 'S01'
                
                if (InvestorData) {
                  const Buffer = InvestorData.data();
                  setInvestorInfo(Buffer)
                  setTicketAmount(Buffer.ticketOwned.length)
                  console.log("This is Buffer : " ,Buffer)
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

    }, [xinvestorID,location.state.ID,location.state.Startup]);

    const handleTicketClick = (ticket) => {
        console.log(ticket)
        if (selectedTicket === ticket) {
            // Deselect the ticket if it's already selected
            setSelectedTicket(null);
        } else {
            // Select the clicked ticket
            setSelectedTicket(ticket);
            if (ticket.capital > investorInfo.balance) {
                alert("insufficient capital")
                setSelectedTicket(null)
            }
        }
    }

    const handleInvest = async () => {
        if (selectedTicket) {
            try {
                console.log("Investing in:", selectedTicket);
                console.log(selectedTicket.id);
    
                // Update the investorName field in the selected ticket document
                const ticketDocRef = doc(db, "tickets", selectedTicket.id);
                await updateDoc(ticketDocRef, {
                    investorName: investorInfo.firstName, // Update with the desired investor name
                });

                const InvestorDocRef = doc(db, "Investor", xinvestorID);
            
                await updateDoc(InvestorDocRef, {
                    balance: investorInfo.balance - selectedTicket.capital,
                    ticketOwned: arrayUnion(selectedTicket.id)
                });

                

                console.log("Investment successful!");
                navigate("/InvestorMain",{ state : { ID : xinvestorID}})
                // Proceed with other investment logic if needed...
    
            } catch (error) {
                console.error("Error updating document:", error);
            }
        } else {
            console.log("No ticket selected.");
        }
    }

    console.log(tickets)
    const filteredTickets = tickets.filter(ticket => ticket.startupName === location.state.Startup.startupName);

    return (
        <div className="App">
            <div className='static-bar'>
                <img src={Revert} alt="Welcome" className='Revertbutton' onClick={() => navigate('/StartupInfo',{ state : { ID : xinvestorID, startup : xStartup}})} />
                <p style={{ fontSize: "7vw" }}> Invest in {location.state.Startup.startupName}</p>
            </div>

            <div className='AppWithHeaderContent2'>
                <div className='StartupsInfoBlocks3'>
                    <img src={location.state.Startup.imgSrc} alt="Welcome" />
        
                    <div className='Divisor'>
                        <h1>Balance</h1>
                    </div>
                    <div className='BalanceBox'>
                        <p style={{ lineHeight: "1vh", fontSize: "10vw", marginBlockStart: "8vh", marginBlockEnd: "3vh" }}>Account Balance</p>
                        <p className='Cash' style={{ marginBlockStart: "0vh", marginBlockEnd: "2vh" }}>{investorInfo.balance}K</p>
                        <span style={{ lineHeight: "0vh", marginBlockStart: "1vh", fontSize: "5vw" }}>
                            <span>Total </span>
                            <span style={{ color: '#079F16' }}> {150-investorInfo.balance}K </span>
                            <span>invested in </span>
                            <span style={{ color: '#079F16' }}>{ticketAmount}</span>
                            <span> Startups</span>
                        </span>
                    </div>
                    <div className='Divisor'>
                        <h1>Available Tickets</h1>
                    </div>
                    <div className="PortfolioBox">
                        {filteredTickets.map((ticket, index) => (
                            ticket.investorName === null && (
                            <ul
                                key={index}
                                className={`TicketBlocks ${selectedTicket === ticket ? 'selected' : ''}`}
                                onClick={() => handleTicketClick(ticket)}
                                style={{ display: selectedTicket && selectedTicket !== ticket ? 'none' : 'block' }}
                            >
                                <p>Ticket Name: {ticket.ticketName}</p>
                                <p>Capital: {ticket.capital}</p>
                                <p>Stake: {ticket.stake}</p>
                            </ul>
                            )
                        ))}
                        </div>

                    {selectedTicket && (
                        <div className='OfferBox'>
                            <div className='Divisor'>
                                <h1>Startup Rating</h1>
                            </div>
                            <div className='RatingBox'>
                                <div className='OfferBox'>
                                    {/* Add your rating details here */}
                                </div>
                            </div>

                            <div className='OfferBox'>
                                <h2>Why would you invest in this company</h2>
                                <div className="ValueSpanContainer">
                                    <div className="appleInputContainer2">
                                        <textarea
                                            type="text"
                                            className="appleInput2"
                                            value={content}
                                            onChange={handleContent}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button className='InvestButton' onClick={handleInvest} >INVEST</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Invest;
