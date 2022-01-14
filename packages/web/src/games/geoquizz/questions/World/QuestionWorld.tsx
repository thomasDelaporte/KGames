import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

import './QuestionWorld.style.scss';

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json"

export const QuestionWorld = () => {

    const onCountryClick = (geo: any) => {
        console.log(geo);
    }

    return (
        <ComposableMap className="geoquizz__question-world">
            <ZoomableGroup zoom={1}>
                <Geographies geography={geoUrl}>
                    {({geographies}: any) => geographies.map((geo: any) =>
                        <Geography key={geo.rsmKey} geography={geo} onClick={onCountryClick.bind(null, geo)} />
                    )}
                </Geographies>
            </ZoomableGroup>
        </ComposableMap>
    )
}