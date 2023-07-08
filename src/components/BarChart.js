import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ getData }) => {
    const [data, setData] = useState({
        posts: 0,
        comments: 0,
        acceptedComments: 0,
    });

    useEffect(() => {
        // Fetch the data from the server
        const fetchData = async () => {
            try {
                const response = await fetch(getData);
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [getData]);

    const { posts, comments, ChosenComments } = data;

    // Prepare the data for the chart
    const chartData = {
        labels: ['Posts', 'Comments', 'Accepted Comments'],
        datasets: [
            {
                label: 'Count',
                data: [posts, comments, ChosenComments],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
            },
        ],
    };

    // Configure chart options
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                precision: 0,
            },
        },
    };

    return (
        <div>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarChart;
