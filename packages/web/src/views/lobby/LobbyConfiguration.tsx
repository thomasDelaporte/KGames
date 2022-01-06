import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GameContext } from '../../store/game';

export const LobbyConfiguration = () => {

    const { websocket, owner } = useContext<{ websocket: WebSocket, owner: boolean }>(GameContext);

    const [theme, setTheme] = useState<string>('default');
    const [time, setTime] = useState<string>('30');

    useEffect(() => {

        if(!owner && time === undefined || theme === undefined)
            return;

        websocket.send(JSON.stringify({ event: 'updateconfig', time, theme }));
    }, [time, theme]);

    useEffect(() => {

        websocket.addEventListener('message', (raw) => {

            const data = JSON.parse(raw.data);

            if(data.event === 'updateconfig') {
                setTheme(data.theme);
                setTime(data.time);
            }
        });
    }, []);

    const startGame = (e: SyntheticEvent) => {

        e.preventDefault();

        if(time === '')
            return;

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

            <form className="lobby__configuration" onSubmit={startGame}>
                <label className="input-group label">Thême
                    <select className="input" value={theme} {...owner && { onChange: (e) => setTheme(e.target.value) }}>
                        <option disabled={!owner} value={'default'}>Thème par défault</option>
                    </select>
                </label>

                <label className="input-group label">Temps
                    <input type="number" className="input" value={time} readOnly={!owner} required min={3}
                        {...owner && { onChange: (e) => setTime(e.target.value) }}/>
                </label>

                {owner &&
                    <button className="btn">Démarrer la partie</button>
                }
            </form>
        </motion.div>
    );
}