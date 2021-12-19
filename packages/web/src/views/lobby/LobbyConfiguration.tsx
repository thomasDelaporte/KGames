import React from 'react';
import { motion } from 'framer-motion';

export const LobbyConfiguration = ({ setStep }: any) => (
    <motion.div
        key={2}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        className="lobby__content"
    >
        <h2 className="lobby__content__title">Configurer votre partie</h2>

        <div className="lobby__configuration">
            <label className="input-group label">
                Thême
                <input type="text" className="input" />
            </label>

            <label className="input-group label">
                Autre option
                <input type="text" className="input" />
            </label>
            
            <label className="input-group label">
                Une option select
                <select className="input input--select">
                    <option>Oui</option>
                </select>
            </label>
        </div>

        <button className="btn" onClick={() => setStep(3)}>
            Démarrer la partie
        </button>
    </motion.div>
);
