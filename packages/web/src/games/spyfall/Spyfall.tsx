import React, { useEffect, useContext, useState } from 'react';
import ReactModal from 'react-modal';

import { GameContext } from '../../store';
import { LocationGuessing } from './LocationGuessing/LocationGuessing';
import { LocationsBoard } from './LocationsBoard/LocationsBoard';
import { PlayersBoard } from './PlayersBoard/PlayersBoard';
import { SpyGuessing } from './SpyGuessing/SpyGuessing';
import { Vote } from './Vote/Vote';

export const Spyfall = () => {

    const { websocket, id, owner, step, setStep, configuration } = useContext<GameContext>(GameContext);
    
    const [ locations, setLocations ] = useState([]);
    const [ round, setRound ] = useState<any>();
    const [ timer, setTimer ] = useState<number>();
    const [ vote, setVote ] = useState();

    const [ locationGuessing, setLocationGuessing ] = useState(false);
    const [ guessingSpy, setGuessingSpy ] = useState(false);

    useEffect(() => {

        websocket.addEventListener('message', (raw) => {

            const data = JSON.parse(raw.data);

            if(data.event === 'locations') {
                setLocations(data.locations);
            } else if(data.event === 'round') {
                setVote(undefined);
                setLocationGuessing(false);
                setGuessingSpy(false);
                setRound(data.round);
            } else if(data.event === 'timer') {
                setTimer(data.time);
            } else if(data.event === 'showguess') {
                setLocationGuessing(true);
            } else if(data.event === 'showvote') {
                setGuessingSpy(false);
                setVote(data.vote);
            }
        });
    }, []);

    if(!round)
        return <p>Waiting for round data...</p>

    return (
        <div className="room__content spyfall">
            <h2 className="page-title__subtitle">Spyfall</h2>

            { timer ? (
                <span className="kculture__time" style={{ '--progress': `${(configuration.timesPerRound * 60 - timer) * 100 / configuration.timesPerRound * 60}%`} as any}>{String(timer).padStart(2, '0')}</span>
            ): null }

            <span className="spyfall__location">{round.location}</span>
            <span className="spyfall__job">{round.job}</span>
            
            <button className="btn" onClick={() => setGuessingSpy(true)}>Accuser un joueur</button>

            <PlayersBoard />
            <LocationsBoard locations={locations} />

            <LocationGuessing isOpen={locationGuessing} locations={locations} onRequestClose={() => setLocationGuessing(false)} />
            <SpyGuessing isOpen={guessingSpy} onRequestClose={() => setGuessingSpy(false)}/>
            <Vote onRequestClose={() => setVote(undefined)} vote={vote} />
        </div>
    )
}