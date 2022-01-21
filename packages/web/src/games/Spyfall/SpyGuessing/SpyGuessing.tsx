import React, { useContext, useState } from 'react';
import ReactModal from 'react-modal';

import { GameContext } from '../../../store';

export const SpyGuessing = ({ isOpen, onRequestClose } : { isOpen: boolean, onRequestClose: any }) => {

    const { websocket, players } = useContext<GameContext>(GameContext);

    const [ selectedUser, setSelectedUser ] = useState<string>(players[0].id);

    const guessingSpy = () => {
        websocket.send(JSON.stringify({ event: 'guessspy', player: selectedUser }));
    }

    return (
        <ReactModal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h3>Selectionner un joueur</h3>

            <select className="input input--select" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                {players.map((player: any, i: number) => (
                    <option value={player.id} key={i}>{player.username}</option>
                ))}
            </select>

            <button className="btn" onClick={guessingSpy}>Accuser</button>
        </ReactModal>
    )
}