import React, { useRef } from 'react';

import './AnswerMarker.style.scss';

export const AnswerMarker = ({ question, response, setResponse }: any) => {

    const image = useRef<HTMLDivElement>(null);

    const onPlaceMarker = (e: React.MouseEvent) => {

        if(!image || !image.current)
            return;
        
        const rect = image.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        setResponse({ x: mouseX, y: mouseY });
    }
    
    return (
        <div className="geoquizz__answer-marker" ref={image} onClick={onPlaceMarker}>

            {response &&
                <div className="geoquizz__answer-marker__marker" style={{ top: response.y, left: response.x }}></div>
            }

            <img className="geoquizz__answer-marker__image" src={question.image} />
        </div>
    )
}