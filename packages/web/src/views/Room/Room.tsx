import React, { useContext, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useParams } from 'react-router-dom';

import { LobbyConfiguration, LobbyGames, LobbyPlayers, LobbyScores } from '../../components/Lobby';
import Login from '../../components/Login/Login';
import Countdown from '../../components/Countdown/Countdown';
import Kculture from '../../games/kculture/Kculture';

import { SessionContext, GameContext } from '../../store';

import './Room.style.scss';

let websocket: WebSocket;

export function Room() {

    const { user } = useContext(SessionContext);
    const { id } = useParams<{id: string}>();

    const [ error, setError ] = useState(false);
    const [ countdown, setCountdown ] = useState(false);

    const [ players, setPlayers ] = useState([]);
    const [ owner, setOwner ] = useState(false);
    const [ step, setStep ] = useState(0);
    const [ scores, setScores ] = useState({});
    const [ configuration, setConfiguration ] = useState({});

    useEffect(() => {

        if( !user || id == null || localStorage.getItem('token') === null )
            return;

        const websocketUrl = new URL(import.meta.env.VITE_WS);
        websocketUrl.searchParams.append('room', id);
        websocketUrl.searchParams.append('token', localStorage.getItem('token') as string);

        websocket = new WebSocket(websocketUrl.href);

        websocket.onclose = (close) => {
            console.log('error', close);
            setError(true);
        }
        
        websocket.addEventListener('message', (raw) => {
            
            const data = JSON.parse(raw.data);
            
            if(data.event === 'joinRoom') {
                setPlayers(data.players);
                setOwner(data.owner);
                setStep(data.step);
                setConfiguration(data.configuration);
            } else if(data.event === 'playerupdate') {
                setPlayers(data.players);
            } else if(data.event === 'updatestep') {
                setStep(data.step);
            } else if(data.event === 'updateowner') {
                setOwner(data.owner);
            } else if(data.event === 'startgame') {
                setCountdown(true);
                setStep(4);
            } else if(data.event === 'scores') {
                setStep(6);
                setScores(data.scores);
            } else if(data.event === 'disablecountdown') {
                setCountdown(false);
            } else if(data.event === 'updateconfig') {
                setConfiguration(data.configuration);
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
        <GameContext.Provider value={{ players, owner, step, websocket, configuration }}>
            <div className="room">
                <h1 className="page-title">
                    {step >= 3 ? 'Game' : 'Room'}
                </h1>

                {countdown && <Countdown />}
                
                <AnimatePresence>
                    {step === 0 ? (
                        <LobbyPlayers />
                    ) : step === 1 ? (
                        <LobbyGames />
                    ) : step === 2 ? (
                        <LobbyConfiguration configuration={configuration} />
                    ) : step === 6 ?
                        <LobbyScores scores={scores} /> :
                    (
                        <Kculture />
                    )}
                </AnimatePresence>
            </div>
        </GameContext.Provider>
    );
}