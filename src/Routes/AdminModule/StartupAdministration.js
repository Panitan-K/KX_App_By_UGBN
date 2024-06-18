import './css/AdminModule.css';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';

function StartupAdministration() {
  const [startups, setStartups] = useState([]);
  const [unfolded, setUnfolded] = useState({});

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
        } else {
          console.error("No startup documents found.");
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

  return (
    <div className="Admin-Component">
      <div>
        
        <ul>
        <h1>Startups</h1>
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
          <button className='AddButtonsAppleStyle'>Add Startups</button>
        </ul>
        
      </div>
    </div>
  );
}

export default StartupAdministration;
