import './css/AdminModule.css';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';
import RacingBarChart from "../RacingBarChart";

function DisplayAdministration() {
  //const [startups, setStartups] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const startupCollectionRef = collection(db, 'Startup');
        const startupQuerySnapshot = await getDocs(startupCollectionRef);

        if (!startupQuerySnapshot.empty) {
          const startupsData = startupQuerySnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().startupName, // Use startupName as name for data
            value: doc.data().fundRaised, // Use fundRaised as value
            color: getRandomColor() // Optional: Generate a random color
          }));
     
          setData(startupsData); // Set data for the RacingBarChart
        } else {
          console.error("No startup documents found.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Optional: Function to generate a random color
  const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
  };

  return (
    <div className="Admin-Component">

        <h2>Top 5 Startups by Tokens  </h2>
        <RacingBarChart data={data} />
     

    </div>
  );
}

export default DisplayAdministration;
