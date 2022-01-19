import React, { useContext } from 'react';
import { GameContext } from '../../../store';

import './PlayersBoard.style.scss';

export const PlayersBoard = () => {

    const { players } = useContext<GameContext>(GameContext);

    return (
        <div className="spyfall__players">
            {players.map((player: any, i: number) => (
                <div className="spyfall__players__item" key={i}>
                    {player.username}
                </div>
            ))}
        </div>
    )
}