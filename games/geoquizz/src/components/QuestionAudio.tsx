import React from 'react';
import { Question } from './Question';

export const QuestionAudio = (props) => (
    <Question {...props}>
        <div className="geoquizz__audio__wrapper">
            <audio className="geoquizz__audio" controls>
                <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg" />
                <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    </Question>
)