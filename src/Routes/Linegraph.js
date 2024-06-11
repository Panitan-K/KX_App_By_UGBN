import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './css/Chart.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const transformData = (data, currentQuarter) => {
  const labels = Object.keys(data).slice(0, currentQuarter);
  const companies = new Set();

  // Collect all company names
  labels.forEach((label) => {
    data[label].forEach((item) => {
      companies.add(item.Company);
    });
  });

  // Create datasets
  const datasets = Array.from(companies).map((company) => {
    const dataset = {
      label: company,
      data: labels.map((label) => {
        const companyData = data[label].find((item) => item.Company === company);
        return companyData ? companyData.Evaluation : null;
      }),
      fill: false,
      tension: 0.4, // Add this line to make the line curvy
      backgroundColor: `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.2)`,
      borderColor: `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},1)`,
    };
    return dataset;
  });

  return {
    labels,
    datasets,
  };
};

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [currentQuarter, setCurrentQuarter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/investment-data');
        const data = response.data;
        console.log(data);  

        if (Object.keys(data).length === 0) {
          setChartData(null);
        } else {
          setChartData(transformData(data, currentQuarter));
        }
      } catch (error) {
        console.error("Error fetching the investment data", error);
      }
    };

    fetchData();

    const interval = setInterval(() => {
      setCurrentQuarter((prevQuarter) => {
        const nextQuarter = prevQuarter + 1;
        fetchData();
        return nextQuarter;
      });
    }, 5000); // Update data every 10 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentQuarter]);

  useEffect(() => {
    if (chartData) {
      const interval = setInterval(() => {
        setCurrentQuarter((prevQuarter) => {
          if (prevQuarter < Object.keys(chartData).length) {
            return prevQuarter + 1;
          } else {
            clearInterval(interval);
            return prevQuarter;
          }
        });
      }, 5000); // Update data every 10 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [chartData]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Startups Evaluation',
      },
    },
  };

  return (
    <div className="App">
      <div className="Leaderboard">
        {chartData ? (
          <Line data={chartData} options={options} />
        ) : (
          <p>No data available</p>
        )}
      </div>
     
    </div>
  );
};

export default Dashboard;
