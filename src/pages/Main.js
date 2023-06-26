import React from 'react';
import MainPageCard from '../components/MainPageCard';
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

export default function Main() {
    const [width, setWidth] = useState(0);
    const top5 = useRef();

    useEffect(() => {
        setWidth(top5.current.scrollWidth - top5.current.offsetWidth);
    }, []);

    return (
        <>
            <div>안녕하세요 카드</div>
            <section>
                <span>top5 글</span>
                <motion.div ref={top5} className="cursor-grab overflow-hidden bg-blue-400">
                    <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className="flex bg-orange-400">
                        <motion.div className="min-w-[144px] min-h-[144px] pr-2">
                            <MainPageCard />
                        </motion.div>
                        <motion.div className="min-w-[144px] min-h-[144px] pr-2">
                            <MainPageCard />
                        </motion.div>
                        <motion.div className="min-w-[144px] min-h-[144px] pr-2">
                            <MainPageCard />
                        </motion.div>
                        <motion.div className="min-w-[144px] min-h-[144px] pr-2">
                            <MainPageCard />
                        </motion.div>
                        <motion.div className="min-w-[144px] min-h-[144px] pr-2">
                            <MainPageCard />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </section>
            <div>
                <span>실시간 글</span>
            </div>
            <div>
                <span>추천 글</span>
            </div>
        </>
    );
}
