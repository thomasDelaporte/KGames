import React, { useContext } from 'react';
import ReactModal from 'react-modal';

import { GameContext } from '../../../store';

export const Vote = ({ vote, onRequestClose }: { vote: any, onRequestClose: any }) => {

    const { players } = useContext<GameContext>(GameContext);
    
    if(vote === undefined)
        return null;

    return (
        <ReactModal isOpen={vote !== undefined} onRequestClose={onRequestClose}>
            <h3>Vote à l'unanimité</h3>

            <p>{vote.from} a dénoncé {vote.to}, seul un vote à l'unanimité peut le condamner.</p>

            <div className="votes">
                {players.map((player: any, i: number) => (
                    <div className="votes__item">
                        
                    </div>
                ))}
            </div>
        </ReactModal>
    )
}