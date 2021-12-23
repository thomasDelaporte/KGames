import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { GameContext } from '../../store/game';

export const LobbyConfiguration = () => {

    const { websocket, owner } = useContext<{ websocket: WebSocket, owner: boolean }>(GameContext);

    const startGame = () => {
        websocket.send(JSON.stringify({ event: 'startgame' }));
    }

    return (
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

            { owner &&
                <button className="btn" onClick={startGame}>
                    Démarrer la partie
                </button>
            }
        </motion.div>
    );
}