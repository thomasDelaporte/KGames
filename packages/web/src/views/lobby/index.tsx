import React, { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { gql, useQuery } from '@apollo/client';

import './index.scss';
import { LobbyPlayers } from './LobbyPlayers';
import { LobbyGames } from './LobbyGames';
import { LobbyConfiguration } from './LobbyConfiguration';

export function Lobby() {

    const [hasJoin, setHasJoin] = useState(false);
    const [step, setStep] = useState(0);

    return (
        <div className="lobby">
            <h1 className="page-title">{step === 3 ? 'Game' : 'Lobby'}</h1>
            <AnimatePresence>
                {step === 0 ? (
                    <LobbyPlayers setStep={setStep} />
                ) : step === 1 ? (
                    <LobbyGames setStep={setStep} />
                ) : step === 2 ? (
                    <LobbyConfiguration setStep={setStep} />
                ) : (
                    null
                )}
            </AnimatePresence>
        </div>
    );
}