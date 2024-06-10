import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

const Dashboard = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/investment-data');
                const data = response.data;
                console.log(data)
                if (data.length === 0) {
                    setChartData(null);
                    return;
                }

                const labels = Array.from({ length: 36 }, (_, i) => `Q${i + 1}`);
                const datasets = data.map(company => ({
                    label: company["Company Name"],
                    data: company["Investments"],
                    fill: false,
                    borderColor: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                }));

                setChartData({
                    labels,
                    datasets
                });
            } catch (error) {
                console.error("Error fetching the investment data", error);
            }
        };

        fetchData();
    }, []);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Investment Over Time',
            },
        },
    };

    return (
        <div>
            <h1>Investment Dashboard</h1>
            {chartData ? (
                <Line data={chartData} options={options} />
            ) : (
                <p>No investment data available.</p>
            )}
        </div>
    );
};

export default Dashboard;
