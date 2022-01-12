import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { GameContext } from '../../../store';

export function LobbyConfiguration({ fields, configuration }: any) {

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

                {Object.keys(fields).map((field: any, i: number) => (
                    <label className="input-group label" key={i}>{fields[field].label}
                        { fields[field].type === 'select' ?
                            <select className="input" value={configuration[field] || ''} {...owner && { onChange: (e) => updateConfig(field, e.target.value) }}>
                                {fields[field].items.map((item: any, k: number) => (
                                    <option disabled={!owner} value={item} key={k}>{item}</option>
                                ))}
                            </select>
                        : fields[field].type === 'number' ?
                            <input type="number" className="input" value={configuration[field] || ''} readOnly={!owner} required min={0}
                                {...owner && { onChange: (e) => updateConfig(field, e.target.value) }}/>
                        : null }
                    </label>
                ))}
                
                {owner &&
                    <button className="btn" >Démarrer la partie</button>
                }
            </form>
        </motion.div>
    );
}