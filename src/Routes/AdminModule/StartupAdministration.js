import './css/AdminModule.css';
import React, { useEffect, useState, useRef } from 'react';
import { db } from '../Firebase';
import Setting from '../image/svg/Setting.svg';
import Trash from '../image/svg/Trash.svg';
import { collection, getDocs, setDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import StartupFormModal from './Forms/StartupFormModal';
import ConfirmationModal from './Forms/ConfirmationModal'; // Import the ConfirmationModal component

function StartupAdministration() {
  const [startups, setStartups] = useState([]);
  const [unfolded, setUnfolded] = useState({});
  const [StartupCount, setStartupCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null); // State to store the ID of the startup to delete
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false); // State to control delete confirmation modal
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startupCollectionRef = collection(db, 'Startup');
        const startupQuerySnapshot = await getDocs(startupCollectionRef);

        if (!startupQuerySnapshot.empty) {
          const startupsData = startupQuerySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setStartups(startupsData);
          setStartupCount(startupsData.length);
        } else {
          console.error("No startup documents found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const closeConfirmationModal = () => {
    setIsConfirmationOpen(false);
  };

  const openConfirmationModal = () => {
    setIsConfirmationOpen(true);
  };

  const handleReset = async () => {
    try {
      const startupCollectionRef = collection(db, 'Startup');
      const startupQuerySnapshot = await getDocs(startupCollectionRef);

      startupQuerySnapshot.forEach(async (docSnapshot) => {
        const docRef = doc(db, 'Startup', docSnapshot.id);
        await updateDoc(docRef, { fundRaised: 0, ticketOwned: [] });
      });

      console.log('All Startup documents have been reset.');

      closeConfirmationModal(); // Close the confirmation modal after reset
      //window.location.reload()
    } catch (error) {
      console.error("Error resetting Startup documents:", error);
    }
  };

  const handleAddStartup = async (newStartup) => {
    try {
      const newIdNumber = StartupCount + 1;
      const newId = `S${newIdNumber.toString().padStart(2, '0')}`;

      const docRef = doc(collection(db, 'Startup'), newId);
      await setDoc(docRef, newStartup);

      setStartups([...startups, { id: newId, ...newStartup }]);
      setStartupCount(StartupCount + 1);
    } catch (error) {
      console.error("Error adding startup:", error);
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

  const toggleFold = (id) => {
    setUnfolded(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    try {
      const updatedStartups = startups.filter(startup => startup.id !== deleteId);
      setStartups(updatedStartups);

      const docRef = doc(db, 'Startup', deleteId);
      await deleteDoc(docRef);

      console.log(`Startup with ID ${deleteId} deleted successfully`);

      setIsDeleteConfirmationOpen(false); // Close the confirmation modal after delete
    } catch (error) {
      console.error("Error deleting startup:", error);
    }
  };

  return (
    <div className="Admin-Component">
      <div>
        <ul>
          <h1>Startups</h1>
          <p>There are: {StartupCount} startups</p>
          <button className='AddButtonsAppleStyle' onClick={openModal}>Add a Startup</button>
          <button className='AddButtonsAppleStyle' onClick={openConfirmationModal}>Reset</button>

          {startups.map(startup => (
            <div key={startup.id} className={`AdminStartupBlock ${unfolded[startup.id] ? 'unfolded' : ''}`}>
              <div className="AdminStartupBlockHeader">
                <p onClick={() => toggleFold(startup.id)}>
                  Startup ID: {startup.id} <br />
                  Startup Name: {startup.startupName} <br />
                  Industry: {startup.industry} <br />
                </p>
                <div className='EditBox'>
                  <img src={Trash} alt="Delete" className='BarIconTopRight' onClick={() => handleDelete(startup.id)} />
                  <img src={Setting} alt="Settings" className='BarIconTopRight' />
                </div>
              </div>
              {unfolded[startup.id] && (
                <div className="AdminStartupBlockContent">
                  <img src={startup.imgSrc} alt="Startup" className='StartupIMGSRC' />
                  <img src={startup.productSrc} alt="Product" className='StartupIMGSRC2' />
                  <p>Ask: {startup.req}</p>
                  <p>Description: {startup.des}</p>
                  {/* Add more fields as needed */}
                </div>
              )}
            </div>
          ))}

          <button className='AddButtonsAppleStyle' onClick={openModal}>Add a Startup</button>
          <div ref={modalRef}>
            <StartupFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddStartup={handleAddStartup} />
          </div>
        </ul>
      </div>

      <ConfirmationModal
        isOpen={isConfirmationOpen}
        onClose={closeConfirmationModal}
        onConfirm={handleReset}
        message="Are you sure you want to reset all startup data?"
      />

      <ConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onClose={() => setIsDeleteConfirmationOpen(false)}
        onConfirm={handleDeleteConfirmed}
        message="Are you sure you want to delete this startup?"
      />
    </div>
  );
}

export default StartupAdministration;
