import './css/App.css';
import Testcontent from './Testcontent';
import axios from 'axios';
import React, { useState, useEffect, useRef } from "react";

function Dashboard() {
  const [data, setData] = useState([]);
  const colorMap = useRef(new Map());

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
          data: fetchedData[quarterKey].map(item => {
            if (!colorMap.current.has(item.Company)) {
              colorMap.current.set(item.Company, getRandomColor());
            }
            return {
              name: item.Company,
              value: item.Evaluation,
              color: colorMap.current.get(item.Company),
            };
          })
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
  const hue = Math.floor(Math.random() * 360); // Random hue between 0 and 360
  const saturation = Math.floor(Math.random() * 50) + 50; // Saturation between 50% and 100%
  const lightness = Math.floor(Math.random() * 20) + 50; // Lightness between 50% and 70%

  return hslToHex(hue, saturation, lightness);
};

const hslToHex = (h, s, l) => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0'); // Convert to Hex and pad with leading zero
  };
  return `#${f(0)}${f(8)}${f(4)}`;
};
export default Dashboard;
