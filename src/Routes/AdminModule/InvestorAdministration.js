import './css/AdminModule.css';
import React, { useEffect, useState, useRef } from 'react';
import { auth, db } from '../Firebase';
import { collection, getDocs, updateDoc, setDoc, doc, deleteDoc } from 'firebase/firestore';
import InvestorFormModal from './Forms/InvestorFormModal';
import ConfirmationModal from './Forms/ConfirmationModal'; // Import the ConfirmationModal component
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Setting from '../image/svg/Setting.svg';
import Trash from '../image/svg/Trash.svg';

function InvestorAdministration() {
  const [investors, setInvestors] = useState([]);
  const [unfolded, setUnfolded] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); // State to control confirmation modal
  const [deleteId, setDeleteId] = useState(null); // State to store the ID of the investor to delete
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false); // State to control delete confirmation modal
  const [InvestorCount, setInvestorCount] = useState(0);
  const modalRef = useRef(null);

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
          setInvestorCount(investorData.length);
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
      const newIdNumber = InvestorCount + 1 ;
      const newId = `IN${newIdNumber.toString().padStart(2, '0')}`;

      const docRef = doc(collection(db, 'Investor'), newId);
      await setDoc(docRef, newInvestor);

      const newId2 = `IN${newIdNumber.toString().padStart(4, '0')}`;
      const userCredential = await createUserWithEmailAndPassword(auth, newInvestor.email, newId2);
      const user = userCredential.user;

      const docRef2 = doc(collection(db, 'Roles'), user.uid);
      await setDoc(docRef2, { role: newId });

      setInvestors([...investors, { id: newId, ...newInvestor }]);
      setInvestorCount(InvestorCount + 1);
    } catch (error) {
      console.error("Error adding investor:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => {
      if (modalRef.current) {
        modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100); // Delay to ensure modal is rendered before scrolling
  };

  const openConfirmationModal = () => {
    setIsConfirmationOpen(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationOpen(false);
  };

  const handleReset = async () => {
    try {
      const investorCollectionRef = collection(db, 'Investor');
      const investorQuerySnapshot = await getDocs(investorCollectionRef);

      investorQuerySnapshot.forEach(async (docSnapshot) => {
        const docRef = doc(db, 'Investor', docSnapshot.id);
        await updateDoc(docRef, { balance: 5, ticketOwned: [] });
      });

      console.log('All investor documents have been reset.');

      closeConfirmationModal(); // Close the confirmation modal after reset
      //window.location.reload()
    } catch (error) {
      console.error("Error resetting investor documents:", error);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const updatedInvestors = investors.filter(investor => investor.id !== deleteId);
      setInvestors(updatedInvestors);

      const docRef = doc(db, 'Investor', deleteId);
      await deleteDoc(docRef);

      console.log(`Investor with ID ${deleteId} deleted successfully`);

      setIsDeleteConfirmationOpen(false); // Close the confirmation modal after delete
    } catch (error) {
      console.error("Error deleting investor:", error);
    }
  };

  return (
    <div className="Admin-Component">
      <div>
        <ul>
          <h1>Investors</h1>
          <span>
            <p>There are: {InvestorCount} investors</p>
            <button className='AddButtonsAppleStyle' onClick={openModal}>Add an Investor</button>
            <button className='AddButtonsAppleStyle' onClick={openConfirmationModal}>Reset</button>
          </span>

          {investors.map(investor => (
            <div
              key={investor.id}
              className={`AdminStartupBlock ${unfolded[investor.id] ? 'unfolded' : ''}`}
            >
              <div className="AdminStartupBlockHeader" >
                <div>
                  <p onClick={() => toggleFold(investor.id)}>Investor ID: {investor.id} <br/>
                  Name: {investor.firstName} {investor.lastName} <br/>
                  Organization: {investor.organization}<br/>
                  Email: {investor.email}
                  </p>
                </div>
                <div className='EditBox'>
                  <img src={Trash} alt="Delete" className='BarIconTopRight' onClick={()=> handleDelete(investor.id)}/>
                  <img src={Setting} alt="Settings" className='BarIconTopRight'/>
                </div>
              </div>
              {unfolded[investor.id] && (
                <div className="AdminStartupBlockContent">
                  <img src={investor.imgSrc} alt="Investor" className='Investor' />
                  <p>{investor.startupName}</p>
                  <p>Balance: {investor.balance}</p>
                  <p>Tickets Owned: {investor.ticketOwned.join(', ')}</p>
                </div>
              )}
            </div>
          ))}
          <button className='AddButtonsAppleStyle' onClick={openModal}>Add an Investor</button>
          <div ref={modalRef}>
            <InvestorFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddInvestor={handleAddInvestor} />
          </div>
        </ul>
        <ConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={closeConfirmationModal}
          onConfirm={handleReset}
          message="Are you sure you want to reset all investor data?"
        />

        {/* Delete Confirmation Modal */}
        <ConfirmationModal
          isOpen={isDeleteConfirmationOpen}
          onClose={() => setIsDeleteConfirmationOpen(false)}
          onConfirm={handleDeleteConfirmed}
          message="Are you sure you want to delete this investor?"
        />
      </div>
    </div>
  );
}

export default InvestorAdministration;
