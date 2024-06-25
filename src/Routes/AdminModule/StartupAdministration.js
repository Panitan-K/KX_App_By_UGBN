import './css/AdminModule.css';
import React, { useEffect, useState, useRef } from 'react';
import { db } from '../Firebase';
import { collection, getDocs, setDoc, doc, updateDoc } from 'firebase/firestore';
import StartupFormModal from './Forms/StartupFormModal';
import ConfirmationModal from './Forms/ConfirmationModal'; // Import the ConfirmationModal component
function StartupAdministration() {
  const [startups, setStartups] = useState([]);
  const [unfolded, setUnfolded] = useState({});
  const [StartupCount,setStartupCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false); 
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
          setStartupCount(startupsData.length)
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
        const StartupCollectionRef = collection(db, 'Startup');
        const StartupQuerySnapshot = await getDocs(StartupCollectionRef);

        StartupQuerySnapshot.forEach(async (docSnapshot) => {
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
      // Generate the new ID
      const newIdNumber = StartupCount + 1;
      const newId = `S${newIdNumber.toString().padStart(2, '0')}`;

      // Create a document reference with the custom ID
      const docRef = doc(collection(db, 'Startup'), newId);

      // Set the new document with the provided data
      await setDoc(docRef, newStartup);

      // Update the local state
      setStartups([...startups, { id: newId, ...newStartup }]);
      setStartupCount(StartupCount + 1); // Increment the count
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
  const toggleFold = (id) => {
    setUnfolded(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <div className="Admin-Component">
      <div>
        
        <ul>
        <h1>Startups</h1>
        
        <p>There are : {StartupCount} Startups</p>
        <button className='AddButtonsAppleStyle' onClick={openModal}>Add a Startup</button>
        <button className='AddButtonsAppleStyle' onClick={openConfirmationModal}>Reset</button>
          {startups.map(startup => (
            <div key={startup.id} className={`AdminStartupBlock ${unfolded[startup.id] ? 'unfolded' : ''}`}>
              <div className="AdminStartupBlockHeader" onClick={() => toggleFold(startup.id)}>
                <p>Startup ID: {startup.id} 
                  <br />  
                Startup Name: {startup.startupName}
                  <br /> 
                Industry : {startup.industry}
                  <br /> 
                
                </p>
                
                
              </div>
              {unfolded[startup.id] && (
                <div className="AdminStartupBlockContent">
                  <img src={startup.imgSrc} alt="StartupIMGSRC" className='StartupIMGSRC'/>
                  <img src={startup.productSrc} alt="StartupIMGSRC2" className='StartupIMGSRC2' />
                  <p>Description <br /> {startup.des} </p>
                  {/* Add more fields as needed */}
                </div>
              )}
            </div>
            
          ))}
          <button className='AddButtonsAppleStyle' onClick={() => setIsModalOpen(true)}>Add a Startup</button>
          <div ref={modalRef}>
            <StartupFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddStartup={handleAddStartup} />
          </div>
        </ul>
       </div>
       <ConfirmationModal
          isOpen={isConfirmationOpen}
          onClose={closeConfirmationModal}
          onConfirm={handleReset}
          message="Are you sure you want to reset all investor data?"
        />
    </div>
  );
}

export default StartupAdministration;
