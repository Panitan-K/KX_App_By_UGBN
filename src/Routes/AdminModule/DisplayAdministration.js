import './css/AdminModule.css';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';
import RacingBarChart from "../RacingBarChart";

function DisplayAdministration() {
  const [startups, setStartups] = useState([]);
  //const [unfolded, setUnfolded] = useState({});

  const data = [
    { name: "Company A", value: 40, color: "#FF5733" },
    { name: "Company B", value: 55, color: "#33FF57" },
    { name: "Company C", value: 70, color: "#3357FF" },
    { name: "Company D", value: 50, color: "#FF33A1" },
    { name: "Company E", value: 45, color: "#FF8333" },
  ];

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
  /*
  const toggleFold = (id) => {
    setUnfolded(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };*/

  return (
    <div className="Admin-Component">

    <div>
      <h1>Startup Evaluation</h1>
      <RacingBarChart data={data} />
    </div>
      <div>
        <ul>

      
          {startups.map(startup => (
            <p>Startup ID: {startup.id}   FundRaised: {startup.fundRaised}</p>
          ))}

        </ul>
        
      </div>
    </div>
  );
}

export default DisplayAdministration;
