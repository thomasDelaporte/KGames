import React from 'react';

import './QuestionAudio.style.scss';

export const QuestionAudio = ({ question, autoPlay }: any) => (
    <div className="kculture__question-audio__wrapper">
        <audio className="kculture__question-audio" controls autoPlay={autoPlay}>
            <source src={question.audio} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
    </div>
)