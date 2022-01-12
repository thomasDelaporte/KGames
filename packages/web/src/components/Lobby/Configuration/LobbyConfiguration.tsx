import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { GameContext } from '../../../store';

export function LobbyConfiguration({ configuration }: any) {

    const { websocket, owner } = useContext<{ websocket: WebSocket, owner: boolean }>(GameContext);

    const startGame = (e: SyntheticEvent) => {
        e.preventDefault();
        websocket.send(JSON.stringify({ event: 'startgame' }));
    }

    const updateConfig = (key: string, value: string) => {
        websocket.send(JSON.stringify({ event: 'updateconfig', key, value }));
    }

    return (
        <motion.div key={2} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="room__content">
            <h2 className="page-title__subtitle">Configurer votre partie</h2>

            <form className="lobby__configuration" onSubmit={startGame}>
                <label className="input-group label">Thême
                    <select className="input" value={configuration.theme || 'default'} {...owner && { onChange: (e) => updateConfig('theme', e.target.value) }}>
                        <option disabled={!owner} value={'default'}>Thème par défault</option>
                    </select>
                </label>

                <label className="input-group label">Temps
                    <input type="number" className="input" value={configuration.time || ''} readOnly={!owner} required min={3}
                        {...owner && { onChange: (e) => updateConfig('time', e.target.value) }}/>
                </label>

                {owner &&
                    <button className="btn" >Démarrer la partie</button>
                }
            </form>
        </motion.div>
    );
}