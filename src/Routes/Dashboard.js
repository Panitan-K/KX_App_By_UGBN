import './css/App.css';
import Testcontent from './Testcontent';
import axios from 'axios';
import React, { useState, useEffect } from "react";

function Dashboard() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/api/investment-data');
      const fetchedData = response.data;
      console.log("THIS IS FETCHED DATA ", fetchedData);

      // Transform the data into an array of quarters
      const transformedData = [];
      let quarterIndex = 1;
      let quarterKey = `Q${quarterIndex}`;

      while (fetchedData.hasOwnProperty(quarterKey)) {
        transformedData.push({
          quarter: quarterKey,
          data: fetchedData[quarterKey].map(item => ({
            name: item.Company,
            value: item.Evaluation,
            color: getRandomColor(),
          }))
        });

        quarterIndex++;
        quarterKey = `Q${quarterIndex}`;
      }

      setData(transformedData);
      console.log("THIS IS Transform DATA ", transformedData);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Testcontent data={data} />
    </div>
  );
}

// Optional: A function to generate random colors
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default Dashboard;
