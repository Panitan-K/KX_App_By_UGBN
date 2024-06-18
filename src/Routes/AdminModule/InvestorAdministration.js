import './css/AdminModule.css';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import InvestorFormModal from './Forms/InvestorFormModal';

function InvestorAdministration() {
  const [investors, setInvestors] = useState([]);
  const [unfolded, setUnfolded] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const investorCollectionRef = collection(db, 'Investor');
        const investorQuerySnapshot = await getDocs(investorCollectionRef);

        if (!investorQuerySnapshot.empty) {
          const investorData = investorQuerySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setInvestors(investorData);
        } else {
          console.error("No investor documents found.");
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

  const handleAddInvestor = async (newInvestor) => {
    try {
      const docRef = await addDoc(collection(db, 'Investor'), newInvestor);
      setInvestors([...investors, { id: docRef.id, ...newInvestor }]);
    } catch (error) {
      console.error("Error adding investor:", error);
    }
  };

  return (
    <div className="Admin-Component">
      <div>
        <ul>
          <h1>Investors</h1>
          {investors.map(investor => (
            <div key={investor.id} className={`AdminStartupBlock ${unfolded[investor.id] ? 'unfolded' : ''}`}>
              <div className="AdminStartupBlockHeader" onClick={() => toggleFold(investor.id)}>
                <p>Investor ID: {investor.id} <br /> Investor Name: {investor.firstName} {investor.lastName}</p>
              </div>
              {unfolded[investor.id] && (
                <div className="AdminStartupBlockContent">
                  <img src={investor.imgSrc} alt="Investor" />
                  <p>{investor.startupName}</p>
                  <p>Balance: {investor.balance}</p>
                  <p>Tickets Owned: {investor.ticketOwned.join(', ')}</p>
                  {/* Add more fields as needed */}
                </div>
              )}
            </div>
          ))}
          <button className='AddButtonsAppleStyle' onClick={() => setIsModalOpen(true)}>Add Investor</button>
        </ul>
        <InvestorFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddInvestor={handleAddInvestor} />
      </div>
    </div>
  );
}

export default InvestorAdministration;
