import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

import './AnswerWorld.style.scss';

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

export const AnswerWorld = ({ question, setAnswer, disabled, answer}: any) => {

    const onCountryClick = (geo: any) => {
        setAnswer(geo.properties.ISO_A2);
    }

    return (
        <ComposableMap className={`geoquizz__answer-world ${disabled ? ' geoquizz__answer-world--disabled' : ''}`}>
            <ZoomableGroup zoom={1}>
                <Geographies geography={geoUrl}>
                    {({geographies}: any) => geographies.map((geo: any) =>
                        <Geography
                            key={geo.rsmKey} 
                            geography={geo} 
                            onClick={onCountryClick.bind(null, geo)} 
                            { ...answer === geo.properties.ISO_A2 && { fill: 'red' }}
                            { ...question && question.answer && geo.properties.ISO_A2 === question.answer && { fill: 'green' }} />
                    )}
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    )
}