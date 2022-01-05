import React, { useContext, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';

import { LobbyPlayers } from './LobbyPlayers';
import { LobbyGames } from './LobbyGames';
import { LobbyConfiguration } from './LobbyConfiguration';
import { SessionContext } from '../../store';
import { GameContext } from '../../store/game';

import './index.scss';

let websocket: WebSocket;

import Login from '../../components/Login';
import Countdown from '../../components/Countdown';
import Geoquizz from '../../games/geoquizz';

export function Lobby() {

    const { user } = useContext(SessionContext);
    const { id } = useParams<{id: string}>();

    const [error, setError] = useState(false);

    const [players, setPlayers] = useState([]);
    const [owner, setOwner] = useState(false);
    const [step, setStep] = useState(0);
    const [countdown, setCountdown] = useState(false);

    useEffect(() => {

        if( !user || localStorage.getItem('token') === null )
            return;

        const websocketUrl = new URL(import.meta.env.VITE_WS);
        websocketUrl.searchParams.append('lobby', id);
        websocketUrl.searchParams.append('token', localStorage.getItem('token') as string);

        websocket = new WebSocket(websocketUrl.href);

        websocket.onclose = (close) => {
            console.log('error', close);
            setError(true);
        }
        
        websocket.addEventListener('message', (raw) => {
            
            const data = JSON.parse(raw.data);
            
            if(data.event === 'joinlobby') {
                setPlayers(data.players);
                setOwner(data.owner);
                setStep(data.step);
            } else if(data.event === 'playerupdate') {
                setPlayers(data.players);
            } else if(data.event === 'updatestep') {
                setStep(data.step);
            } else if(data.event === 'updateowner') {
                setOwner(data.owner);
            } else if(data.event === 'startgame') {
                setCountdown(true);
            }
        });
    }, [user]);

    if(!user)
        return <Login />

    if(error) 
        return <p>error...</p>

    if(players.length === 0)
        return <p>Loading...</p>

    return (
        <GameContext.Provider value={{ players, owner, step, websocket }}>
            <div className="lobby">
                <h1 className="page-title">
                    {step >= 3 ? 'Game' : 'Lobby'}
                </h1>

                {countdown &&
                    <Countdown onFinish={() => setCountdown(false)} />
                }
                
                <AnimatePresence>
                    {step === 0 ? (
                        <LobbyPlayers />
                    ) : step === 1 ? (
                        <LobbyGames />
                    ) : step === 2 ? (
                        <LobbyConfiguration />
                    ) : (
                        <Geoquizz />
                    )}
                </AnimatePresence>
            </div>
        </GameContext.Provider>
    );
}