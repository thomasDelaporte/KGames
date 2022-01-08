import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import './Countdown.style.scss';

export default function Countdown() {

    const [timer, setTimer] = React.useState<string | number>(3);

    useEffect(() => {

        const interval = setInterval(() => {

            setTimer((prev: any) => {

                if(prev < 1) {
                    clearInterval(interval);
                    return 'GO!';
                }
                
                return prev - 1
            }) }, 1000)

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div className="countdown" animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -100 }}>
            <motion.span className="countdown__timer" animate={{ y: '-50%' }} initial={{ y: '100%' }}>{timer}</motion.span>
        </motion.div>
    )
}