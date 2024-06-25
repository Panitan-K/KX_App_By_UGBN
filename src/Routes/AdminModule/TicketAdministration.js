import './css/AdminModule.css';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { collection, getDocs, deleteDoc ,doc } from 'firebase/firestore';
import ConfirmationModal from './Forms/ConfirmationModal'; // Import the ConfirmationModal component
//import BarChart from '../Component/BarChart';

function TicketAdministration() {
  const [tickets, setTickets] = useState([]);
  const [unfolded, setUnfolded] = useState({});
  const [columns, setColumns] = useState(3); // Default to 3 columns
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketsCollectionRef = collection(db, 'tickets');
        const ticketsQuerySnapshot = await getDocs(ticketsCollectionRef);
        let ticketData = [];
        if (!ticketsQuerySnapshot.empty) {
          ticketData = ticketsQuerySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }))
          setTickets(ticketData);
          
        }
        else {
          console.error("No tickets documents found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const toggleFold = (id) => {
    setUnfolded(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const closeConfirmationModal = () => {
    setIsConfirmationOpen(false);
  };
  const openConfirmationModal = () => {
    setIsConfirmationOpen(true);
  };
const handleDelete = async () => {
    try {
        const ticketCollectionRef = collection(db, 'tickets');
        const ticketQuerySnapshot = await getDocs(ticketCollectionRef);

        // Iterate through each document in the snapshot and delete it
        for (const docSnapshot of ticketQuerySnapshot.docs) {
            const docRef = doc(db, 'tickets', docSnapshot.id);
            await deleteDoc(docRef);
        }

        console.log('All ticket documents have been deleted.');

        // Close the confirmation modal after reset
        closeConfirmationModal(); 
        window.location.reload()
    } catch (error) {
        console.error("Error deleting ticket documents:", error);
    }
};

  const changeColumns = (num) => {
    setColumns(num);
  };
  console.log(tickets)
  return (
    <div className="Admin-Component">
      <div>
        <h1>Tickets</h1>
        <button className='AddButtonsAppleStyle' onClick={openConfirmationModal}>Delete all Tickets</button>
        <div>
          <button onClick={() => changeColumns(1)}>1 Column</button>
          <button onClick={() => changeColumns(2)}>2 Columns</button>
          <button onClick={() => changeColumns(3)}>3 Columns</button>
          <button onClick={() => changeColumns(4)}>4 Columns</button>
        </div>
        <div className="grid-container" style={{ '--columns': columns }}>
          {tickets.map(ticket => (
            <div key={ticket.id} className="" /*{` ${unfolded[ticket.id] ? 'unfolded' : ''}`}*/>
              <div className="TicketGridblock" onClick={() => toggleFold(ticket.id)}>
                <p>Ticket ID: {ticket.id} </p>
                {unfolded[ticket.id] && (
                <div className="TicketGridblock-EXT">
           
                  <p>Startup : {ticket.startupName} <br /> Investor : {ticket.investorName}</p>
                  <p>Rating</p>
                  
                  <table className='TicketTable'>
                    <tbody>
                  
                      <tr>
                        <th>Market Size</th>
                        <td>{ticket.rating.marketSize}</td>
                      </tr>
                      <tr>
                        <th>Business Potential</th>
                        <td>{ticket.rating.businessPotential}</td>
                      </tr>
                      <tr>
                        <th>Team Potential</th>
                        <td>{ticket.rating.teamPotential}</td>
                      </tr>
                      <tr>
                        <th>Tech Innovation</th>
                        <td>{ticket.rating.techInnovation}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p>Comment</p>
                  {ticket.rating.comment}         
                </div>
              )}
              </div>
              
            </div>
          ))}
        </div>
        
      </div>
      <ConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={closeConfirmationModal}
          onConfirm={handleDelete}
          message="Are you sure you want to reset all investor data?"
        />
    </div>
  );
}

export default TicketAdministration;
