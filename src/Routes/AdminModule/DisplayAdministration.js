import './css/AdminModule.css';
import React, { useEffect, useState } from 'react';
import { db } from '../Firebase';
import { collection, getDocs } from 'firebase/firestore';
import RacingBarChart from "../RacingBarChart";

function DisplayAdministration() {
  const [data, setData] = useState([]);
  const [seconds, setSeconds] = useState(20); // Initialize timer for 20 seconds

  // Function to fetch and update data
  const fetchData = async () => {
    try {
      const startupCollectionRef = collection(db, 'Startup');
      const startupQuerySnapshot = await getDocs(startupCollectionRef);

      if (!startupQuerySnapshot.empty) {
        let startupsData = startupQuerySnapshot.docs.map(doc => ({
          id: doc.id,
          name: doc.data().startupName,
          value: doc.data().fundRaised
        }));

        // Sort startups by fundRaised in descending order and take the top 5
        startupsData = startupsData.sort((a, b) => b.value - a.value).slice(0, 5);

        // Assign colors
        startupsData = startupsData.map((startup, index) => {
          let color;
          switch (index) {
            case 0:
              color = '#FFD700'; // Gold
              break;
            case 1:
              color = '#C0C0C0'; // Silver
              break;
            case 2:
              color = '#CD7F32'; // Bronze
              break;
            default:
              color = '#0000FF'; // Blue for 4th and 5th
              break;
          }
          return { ...startup, color };
        });

        setData(startupsData);
      } else {
        console.error("No startup documents found.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially

    const intervalId = setInterval(() => {
      fetchData();
      setSeconds(20); // Reset the timer after data fetch
    }, 20000); // 20 seconds

    const timerId = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 20)); // Decrease the seconds countdown
    }, 1000); // Update every second

    // Clear intervals on component unmount
    return () => {
      clearInterval(intervalId);
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="Admin-Component">
      <h2>Top 5 Startups by Tokens</h2>
      <RacingBarChart data={data} />
      <p>Next update in {seconds} seconds</p>
    </div>
  );
}

export default DisplayAdministration;
