import React, { useContext, useEffect, useState } from 'react';
import ReactModal from 'react-modal';

import { GameContext } from '../../../store';

export const LocationGuessing = ({ locations, isOpen, onRequestClose }: { locations: Array<string>, isOpen: boolean, onRequestClose: any }) => {

    const { websocket } = useContext<GameContext>(GameContext);
    const [ selectedLocation, setSelectedLocation ] = useState();

    useEffect(() => {

        websocket.addEventListener('message', onEvent);
        return () => websocket.removeEventListener('message', onEvent);
    });

    const onEvent = (raw: MessageEvent) => {
        
        const data = JSON.parse(raw.data);

        if(data.event === 'selectlocation') {
            setSelectedLocation(data.location);
        }
    }

    const selectLocation = (location: string) => {
        websocket.send(JSON.stringify({ event: 'selectlocation', location }))
    }

    return (
        <ReactModal className="modal" isOpen={isOpen} onRequestClose={onRequestClose}>
            <h3>L'espion choisit la location</h3>

            <div className="locations">
                {locations.map((location: string, i: number) => (
                    <button 
                        key={i}
                        onClick={selectLocation.bind(null, location)}
                        {...location === selectedLocation && { style: { background: 'red' }} }
                        className={`locations__item ${location === selectedLocation ? 'locations__item--selected' : ''}`}>
                        {location}
                    </button>
                ))}
            </div>
            
            <button className="btn">Valider</button>
        </ReactModal>
    )
}