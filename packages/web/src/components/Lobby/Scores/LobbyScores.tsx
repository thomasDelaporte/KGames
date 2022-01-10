import React, { useContext } from 'react';
import { motion } from 'framer-motion';

import { GameContext } from '../../../store';

import './LobbyScores.style.scss';

export function LobbyScores({ scores }: { scores: any }) {

    const { owner, websocket } = useContext(GameContext);

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: .1,
                delayChildren: 0.3
            }
        }
    }
      
    const item = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
    }

    return (
        <React.Fragment>
            <motion.ul className="lobby__scores" variants={container} initial="hidden" animate="show">
                {Object.keys(scores).map((playerid, i) => (
                    <motion.li className="lobby__scores__item" variants={item} key={i}>
                        <span className="lobby__scores__item__username">{scores[playerid].username}</span>
                        <span className="lobby__scores__item__score">{scores[playerid].score}</span>
                    </motion.li>
                ))}
            </motion.ul>

            { owner && 
                <button className="btn" onClick={() => websocket.send(JSON.stringify({ event: 'reset' }))}>Reset</button>
            }
        </React.Fragment>
    )     
}