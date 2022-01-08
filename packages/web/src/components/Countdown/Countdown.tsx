import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import './Countdown.style.scss';

export default function Countdown({ active, setActive }: { active: boolean, setActive: any }) {

    const [timer, setTimer] = React.useState(3);

    useEffect(() => {

        if(!active)
            return;
        
        const interval = setInterval(() => {

            setTimer((prev) => {

                if(prev <= 1) {

                    setActive(false);
                    clearInterval(interval);
                    return 3;
                }

                return prev - 1
            }) }, 1000)

        return () => clearInterval(interval);
    }, [active]);

    if(!active)
        return null;

    return (
        <motion.div className="countdown" animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: -100 }}>
            <motion.span className="countdown__timer" animate={{ y: '-50%' }} initial={{ y: '100%' }}>{timer}</motion.span>
        </motion.div>
    )
}