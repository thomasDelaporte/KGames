import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const LobbyPlayers = ({ setStep }: any) => {

    const [players, setPlayers] = useState([]);
    const [showCopy, setShowCopy] = useState(false);

    useEffect(() => {
        if (showCopy === false) return;

        navigator.clipboard.writeText(window.location.href);
        setTimeout(() => setShowCopy(false), 1000);
    }, [showCopy]);

    return (
        <motion.div
            key={0}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: 50 }}
            className="lobby__content"
        >
            <h2 className="lobby__content__title">Inviter vos amis</h2>

            <div className="lobby__players players">
                {players.map((player, i) => (
                    <div className="players__item">
                        <img className="players__item__thumbnail" src={player.thumbnail} />
                        <h2>{player.username}</h2>
                    </div>
                ))}

                <button className="players__item players__item--empty" onClick={() => setShowCopy(true)}>
                    <motion.span
                        className="players__item--empty__copy"
                        style={{ x: '-50%' }}
                        initial={{ opacity: 0 }}
                        animate={{
                            y: showCopy ? '-1.75rem' : '0rem',
                            opacity: showCopy ? 1 : 0,
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 150,
                            delay: 0.1,
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                            <path d="M18 6v-6h-18v18h6v6h18v-18h-6zm-16 10v-14h14v4h-10v10h-4z" fill="#ffffff" />
                        </svg>
                        Vous avez copié le lien
                    </motion.span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm11.122 12.065c-.073.301-.122.611-.122.935 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-1.165 0-2.204.506-2.935 1.301l-5.488-2.927c-.23.636-.549 1.229-.943 1.764l5.488 2.927zm7.878-15.065c0-2.209-1.791-4-4-4s-4 1.791-4 4c0 .324.049.634.122.935l-5.488 2.927c.395.535.713 1.127.943 1.764l5.488-2.927c.731.795 1.77 1.301 2.935 1.301 2.209 0 4-1.791 4-4z" />
                    </svg>
                    Inviter vos amis
                </button>
            </div>

            <button className="btn" onClick={() => setStep(1)}>
                Choissisez le jeu
            </button>
        </motion.div>
    );
};