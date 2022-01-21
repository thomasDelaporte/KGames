import React from 'react';

import './LocationsBoard.style.scss';

export const LocationsBoard = ({ locations }: any) => {

    return (
        <div className="spyfall__locations">
            {locations.map((location: any, i: number) => (
                <div className="spyfall__locations__item" key={i}>
                    {location}
                </div>
            ))}
        </div>
    )
}