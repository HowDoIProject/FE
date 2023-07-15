import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from '@ramonak/react-progress-bar';
import { useCookies } from 'react-cookie';

const HorizontalBarGraph = () => {
    const [graphData, setGraphData] = useState({
        mypost: 0,
        mycomment: 0,
        mylikes: 0,
    });
    const [cookies] = useCookies(['accessToken']);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://howdoiapp.shop/api/mystat', {
                    headers: {
                        access: `${cookies.accessToken}`,
                    },
                });
                const data = response.data;
                setGraphData(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [cookies]);

    const progressData = [
        {
            label: '내 작성글',
            bgColor: '#4CAF50',
            completed: graphData.mypost,
        },
        {
            label: '댓글',
            bgColor: '#FFC107',
            completed: graphData.mycomment,
        },
        {
            label: '좋아요',
            bgColor: '#2196F3',
            completed: graphData.mylikes,
        },
    ];

    return (
        <div>
            {progressData.map((data, index) => (
                <div key={data.label} className={index !== 0 ? 'mt-4' : ''}>
                    <ProgressBar completed={data.completed} label={data.label} bgColor={data.bgColor} />
                </div>
            ))}
        </div>
    );
};

export default HorizontalBarGraph;
