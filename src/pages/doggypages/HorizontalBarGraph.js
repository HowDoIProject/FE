import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProgressBar from '@ramonak/react-progress-bar';
import { useCookies } from 'react-cookie';
import parents from '../../assets/icon/welcomeparents.svg';

const HorizontalBarGraph = ({ nickname }) => {
    const [graphData, setGraphData] = useState({
        mypost: 1,
        mycomment: 1,
        mylikes: 1,
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

    console.log('graphData', graphData);

    return (
        <div>
            <div className="w-full h-[216px] px-6 py-4 justify-between items-center rounded-xl bg-bgcard shadow-mainbox">
                <div className="flex justify-between border-b border-gray_03 pb-4 items-center">
                    <div className="flex flex-col items-start gap-1">
                        <h1 className="font-['Pretendard-Bold']">안녕하세요!</h1>
                        <h1 className="font-['Pretendard-Bold'] w-[180px] line-clamp-1">{nickname}님</h1>
                    </div>
                    <img src={parents} alt="" />
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="text-[14px]">게시글</div>
                    <ProgressBar
                        completed={graphData.mypost * 10}
                        bgColor="#FFA41B"
                        width="240px"
                        height="10px"
                        labelClassName="label"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-[14px]">답변</div>
                    <ProgressBar
                        completed={graphData.mycomment * 10}
                        bgColor="#FFA41B"
                        width="240px"
                        height="10px"
                        labelClassName="label"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-[14px]">도움됐어요</div>
                    <ProgressBar
                        completed={graphData.mylikes * 10}
                        bgColor="#FFA41B"
                        width="240px"
                        height="10px"
                        labelClassName="label"
                    />
                </div>
            </div>
        </div>
    );
};

export default HorizontalBarGraph;
