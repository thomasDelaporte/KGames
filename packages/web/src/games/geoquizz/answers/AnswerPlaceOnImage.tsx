import React, { SyntheticEvent, useRef } from 'react';
import { Question } from '../questions';

export const AnswerPlaceOnImage = ({ question, response, setResponse }: any) => {

    const image = useRef<HTMLElement>(null);

    const onPlaceMarker = (e: React.MouseEvent) => {

        if(!image || !image.current)
            return;
        
        const rect = image.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        setResponse({ x: mouseX, y: mouseY });
    }
    
    return (
        <div className="geoquizz__image-place" ref={image} onClick={onPlaceMarker}>

            {response &&
                <div className="geoquizz__image-place__marker" style={{ top: response.y, left: response.x }}></div>
            }

            <img src={question.image} />
        </div>
    )
}