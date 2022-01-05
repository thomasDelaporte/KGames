import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GameContext } from '../../store/game';

export const LobbyConfiguration = () => {

    const { websocket, owner } = useContext<{ websocket: WebSocket, owner: boolean }>(GameContext);

    const [theme, setTheme] = useState<string>('');
    const [time, setTime] = useState<string>('30');

    useEffect(() => {

        if(!owner && time === undefined || theme === undefined)
            return;

        websocket.send(JSON.stringify({ event: 'updateconfig', time, theme }));
    }, [time, theme]);

    useEffect(() => {

        if(owner)
            return;

        websocket.addEventListener('message', (raw) => {

            const data = JSON.parse(raw.data);

            console.log('update from ws', data);

            if(data.event === 'updateconfig') {
                setTheme(data.theme);
                setTime(data.time);
            }
        });
    }, []);

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
                <label className="input-group label">Thême
                    <select className="input" value={theme} {...owner && { onChange: (e) => setTheme(e.target.value) }}>
                        <option disabled={!owner}>Thème par défault</option>
                    </select>
                </label>

                <label className="input-group label">Temps
                    <input type="number" className="input" value={time} readOnly={!owner} 
                        {...owner && { onChange: (e) => setTime(e.target.value) }}/>
                </label>
            </div>

            {owner &&
                <button className="btn" onClick={startGame}>
                    Démarrer la partie
                </button>
            }
        </motion.div>
    );
}