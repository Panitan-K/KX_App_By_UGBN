import './css/AdminModule.css';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import StartupFormModal from './Forms/StartupFormModal';
function StartupAdministration() {
  const [startups, setStartups] = useState([]);
  const [unfolded, setUnfolded] = useState({});
  const [StartupCount,setStartupCount] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
          {startups.map(startup => (
            <div key={startup.id} className={`AdminStartupBlock ${unfolded[startup.id] ? 'unfolded' : ''}`}>
              <div className="AdminStartupBlockHeader" onClick={() => toggleFold(startup.id)}>
                <p>Startup ID: {startup.id} <br />  Startup Name: {startup.startupName}</p>
              </div>
              {unfolded[startup.id] && (
                <div className="AdminStartupBlockContent">
                  <img src={startup.imgSrc} alt="StartupIMGSRC" />
                  <p>{startup.startupName}</p>
                  {/* Add more fields as needed */}
                </div>
              )}
            </div>
            
          ))}
          <button className='AddButtonsAppleStyle' onClick={() => setIsModalOpen(true)}>Add a Startup</button>
          <StartupFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddStartup={handleAddStartup} />
     
        </ul>
       </div>
    </div>
  );
}

export default StartupAdministration;
