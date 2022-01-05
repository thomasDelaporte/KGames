import React, { useContext } from 'react';
import { GameContext } from '../../store/game';

export default function Score({ scores }: { scores: any }) {

    const { owner, websocket } = useContext(GameContext);

    return (
        <div className="scores">
            {Object.keys(scores).map((playerid, i) => (
                <p>{playerid} : {scores[playerid]}</p>
            ))}

            { owner && 
                <button className="btn" onClick={() => websocket.send(JSON.stringify({ event: 'reset' }))}>Reset</button>
            }
        </div>
    )     
}