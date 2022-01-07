import React from 'react';
import { Question } from './Question';

export const QuestionAudio = ({ question }: any) => (
    <Question question={question}>
        <div className="geoquizz__audio__wrapper">
            <audio className="geoquizz__audio" controls autoPlay>
                <source src={question.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
        </div>
    </Question>
)