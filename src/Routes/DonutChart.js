import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
    const chartRef = useRef(null);

    const data = {
        labels: ['NIA', 'ARV', 'SCB10x'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
      
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                 
                ],
                borderWidth: 1,
            },
        ],
    };

    useEffect(() => {
        const chartInstance = chartRef.current;
        return () => {
            if (chartInstance && chartInstance.chartInstance) {
                chartInstance.chartInstance.destroy();
            }
        };
    }, []);

    return (
        <div>
           
            <Doughnut ref={chartRef} data={data} />
        </div>
    );
};

export default DonutChart;
