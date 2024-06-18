import './css/AdminModule.css';
import React, { useEffect, useState } from 'react';
import { auth ,db } from '../Firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import InvestorFormModal from './Forms/InvestorFormModal';
import { createUserWithEmailAndPassword } from 'firebase/auth';

function InvestorAdministration() {
  const [investors, setInvestors] = useState([]);
  const [unfolded, setUnfolded] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [InvestorCount,setInvestorCount] = useState(0)
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
          setInvestorCount(investorData.length)
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
      // Generate the new ID
      const newIdNumber = InvestorCount + 1;
      const newId = `IN${newIdNumber.toString().padStart(2, '0')}`;

      // Create a document reference with the custom ID
      const docRef = doc(collection(db, 'Investor'), newId);

      // Set the new document with the provided data
      await setDoc(docRef, newInvestor);
      console.log(newInvestor)
      console.log(newId)
      const newId2 = `IN${newIdNumber.toString().padStart(4, '0')}`
      const userCredential = await createUserWithEmailAndPassword(auth, newInvestor.email, newId2);
      const user = userCredential.user;
      console.log(user.uid)
      // Set the new document with the provided data
      const docRef2 = doc(collection(db, 'Roles'), user.uid);
      await setDoc(docRef2, {role: newId});
      // Update the local state
      setInvestors([...investors, { id: newId, ...newInvestor }]);
      setInvestorCount(InvestorCount + 1); // Increment the count
    } catch (error) {
      console.error("Error adding investor:", error);
    }
  };

  return (
    <div className="Admin-Component">
      <div>
        <ul>
          <h1>Investors</h1>
          <p>There are : {InvestorCount} investors</p>
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
          <button className='AddButtonsAppleStyle' onClick={() => setIsModalOpen(true)}>Add an Investor</button>
          <InvestorFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddInvestor={handleAddInvestor} />
      
        </ul>
       </div>
    </div>
  );
}

export default InvestorAdministration;
