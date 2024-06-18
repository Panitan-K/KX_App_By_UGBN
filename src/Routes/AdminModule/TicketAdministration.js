import './css/AdminModule.css';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';

function TicketAdministration() {
  const [tickets, setTickets] = useState([]);
  const [unfolded, setUnfolded] = useState({});
  const [columns, setColumns] = useState(3); // Default to 3 columns

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

  const changeColumns = (num) => {
    setColumns(num);
  };
  console.log(tickets)
  return (
    <div className="Admin-Component">
      <div>
        <h1>Tickets</h1>
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
                <p>Ticket ID: {ticket.id} <br /> Ticket Name: {ticket.ticketName}</p>
                {unfolded[ticket.id] && (
                <div className="TicketGridblock-EXT">
           
                  <p>Startup : {ticket.startupName} <br /> Investor : {ticket.investorName}<br />Stake : {ticket.stake}<br />Capital : {ticket.capital} </p>
                  {/* Add more fields as needed */}
                </div>
              )}
              </div>
              
            </div>
          ))}
        </div>
        <button className='AddButtonsAppleStyle'>Add Tickets</button>
      </div>
    </div>
  );
}

export default TicketAdministration;
