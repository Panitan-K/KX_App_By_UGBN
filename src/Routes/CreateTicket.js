import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import plus from "./image/svg/plusicon.png";
import minus from "./image/svg/minusicon.png";
import Revert from "./image/svg/Revert.png";
import { collection, getDocs, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from './Firebase'; // Adjust the import according to your Firebase setup

function CreateTicket() {
    const navigate = useNavigate();
    const [capital, setCapital] = useState(25);
    const [stake, setStake] = useState(5);
    const [ticketName, setTicketName] = useState(''); // State for ticket name
    const [loading, setLoading] = useState(false);
    const [startupInfo,setStartupInfo] = useState({});
    const [ticketCreated,setTicketCreated] = useState(0)
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top of the page when component mounts
       
    
        const fetchStartup = async () => {
          try {
            const StartupCollectionRef = collection(db, 'Startup'); // Reference to 'Startup' collection
            const StartupquerySnapshot = await getDocs(StartupCollectionRef); // Query the collection and get snapshot
            
            if (!StartupquerySnapshot.empty) {
              const StartupData = StartupquerySnapshot.docs.find(doc => doc.id === 'S01'); // Find the document with ID 'S01'
              
              if (StartupData) {
                const Buffer = StartupData.data();
                setStartupInfo(Buffer)
                setTicketCreated(Buffer.ticketOwned.length)
          
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
      
 
        fetchStartup();
      }, []);

    const increaseStake = () => {
        if (stake < 20) {
            setStake(prevStake => prevStake + 1);
        }
    };

    const decreaseStake = () => {
        if (stake > 1) {
            setStake(prevStake => prevStake - 1);
        }
    };

    const increaseCapital = () => {
        if (capital < 150) {
            setCapital(prevCapital => prevCapital + 5);
        }
    };

    const decreaseCapital = () => {
        if (capital > 5) {
            setCapital(prevCapital => prevCapital - 5);
        }
    };

    const executeStartupUpdate = async (ticketID, stake) => {
        try {
          const StartupCollectionRef = collection(db, 'Startup'); // Reference to 'Startup' collection
          const StartupquerySnapshot = await getDocs(StartupCollectionRef); // Query the collection and get snapshot
          
          if (!StartupquerySnapshot.empty) {
            const StartupData = StartupquerySnapshot.docs.find(doc => doc.id === 'S01'); // Find the document with ID 'S01'
            
            if (StartupData) {
              const currentData = StartupData.data();
              
              // Update stakeRemain by subtracting the stake
              const updatedStakeRemain = currentData.stakeRemain - stake;
        
              // Append ticketID to ticketOwned array
              const updatedTicketOwned = [...currentData.ticketOwned, ticketID];
        
              // Update the document with the updated data
              await updateDoc(StartupData.ref, {
                stakeRemain: updatedStakeRemain,
                ticketOwned: updatedTicketOwned,
              });
              
              console.log('Startup data updated successfully!');
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


    const handleInvest = async () => {
        setLoading(true); // Set loading to true to show the overlay
        const newTicket = {
            startupName: "Uphasia",
            investorName: null,
            ticketName: ticketName, // Use the ticketName state here
            stake: stake,
            capital: capital,
        };
        console.log(newTicket);
        try {
            // Get the reference to the "tickets" collection
            const ticketsCollectionRef = collection(db, "tickets");

            // Get all documents in the "tickets" collection
            const ticketsSnapshot = await getDocs(ticketsCollectionRef);
    
            // Get the count of existing documents
            const ticketCount = ticketsSnapshot.size;
    
            // Generate the new document ID
            const newTicketId = `Ticket_No${ticketCount + 1}`;
    
            // Create a reference to the new document
            const ticketDocRef = doc(db, "tickets", newTicketId);
    
            // Set the new ticket in the "tickets" collection with the generated ID
            await setDoc(ticketDocRef, newTicket);
            console.log("Document written with ID: ", newTicketId);
            
            executeStartupUpdate(newTicketId, newTicket.stake)

            // Redirect to another page after creating the ticket
            navigate('/Startup');
            
        } catch (error) {
            console.error("Error adding document: ", error);
        } finally {
            setLoading(false); // Set loading to false to hide the overlay
            
        }
    };
    
    return (
        <div className="App">
            {loading && <div className="loading-overlay">Processing...</div>}
            <div className='static-bar'>
                <img src={Revert} alt="Welcome" className='Revertbutton' onClick={() => navigate('/Startup')} />
                <p style={{ fontSize: "7vw" }}>Create Ticket</p>
            </div>

            <div className='AppWithHeaderContent2'>
                <div className='BalanceBox'>
                    <p style={{ lineHeight: "1vh", fontSize: "10vw", marginBlockStart: "10vh", marginBlockEnd: "3vh" }}>Stake Remain</p>
                    <p className='Cash' style={{ marginBlockStart: "0vh", marginBlockEnd: "2vh" }}>{startupInfo.stakeRemain}%</p>
                    <span style={{ lineHeight: "0vh", marginBlockStart: "1vh", fontSize: "5vw" }}>
                       
                        <span style={{ color: '#079F16' }}> {ticketCreated}/5</span>
                        <span> Tickets Created</span>
                       
                    </span>
                </div>
                <div className='StartupsInfoBlocks3'>
                    <div className='Divisor'>
                        <h1>Ticket Properties</h1>
                    </div>
                    <div className='OfferBox'>
                        <div className="ValueSpanContainer">
                            <h1>Ticket Name</h1>
                            <input
                                type="text"
                                placeholder="Enter Ticket Name"
                                value={ticketName}
                                className='TicketNameInput'
                                onChange={(e) => setTicketName(e.target.value)}
                                required
                            />
                            <h1>Stake</h1>
                            <div className='ValueSpan'>
                                <img src={minus} alt="Welcome" onClick={decreaseStake} />
                                <h1>{stake}%</h1>
                                <img src={plus} alt="Welcome" onClick={increaseStake} />
                            </div>
                            <h1>Capital</h1>
                            <div className='ValueSpan'>
                                <img src={minus} alt="Welcome" onClick={decreaseCapital} />
                                <h1>{capital}K</h1>
                                <img src={plus} alt="Welcome" onClick={increaseCapital} />
                            </div>
                        </div>
                        <button className='InvestButton' onClick={handleInvest} disabled={loading}>
                            {loading ? 'Creating...' : 'Create Ticket'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateTicket;
