import React, { useRef } from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

import './AnswerWorld.style.scss';

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

export const AnswerWorld = ({ question, setAnswer, disabled, answer}: any) => {

    const map = useRef<HTMLDivElement>(null);

    const onCountryClick = (geo: any, e: MouseEvent) => {
        setAnswer(geo.properties.ISO_A2);
    }

    return (
        <div className={`geoquizz__answer-world ${disabled ? ' geoquizz__answer-world--disabled' : ''}`} ref={map}>
            <ComposableMap>
                <ZoomableGroup zoom={1}>
                    <Geographies geography={geoUrl}>
                        {({geographies}: any) => geographies.map((geo: any) =>
                            <Geography
                                key={geo.rsmKey} 
                                geography={geo} 
                                {...!disabled && { onClick: onCountryClick.bind(null, geo) }} 
                                { ...answer && answer === geo.properties.ISO_A2 && { fill: '#6a5bcd' }}
                                { ...question && question.answer && geo.properties.ISO_A2 === question.answer && { fill: '#71bc78' }} />
                        )}
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
        </div>
    )
}