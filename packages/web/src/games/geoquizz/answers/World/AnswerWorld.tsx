import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

import './AnswerWorld.style.scss';

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

export const AnswerWorld = ({ setAnswer, answer}: any) => {

    const onCountryClick = (geo: any) => {
        setAnswer(geo.rsmKey);
    }

    return (
        <ComposableMap className="geoquizz__answer-world">
            <ZoomableGroup zoom={1}>
                <Geographies geography={geoUrl}>
                    {({geographies}: any) => geographies.map((geo: any) =>
                        <Geography 
                            key={geo.rsmKey} 
                            geography={geo} 
                            onClick={onCountryClick.bind(null, geo)} 
                            { ...answer === geo.rsmKey && {style: { fill: 'red' }}} />
                    )}
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    )
}