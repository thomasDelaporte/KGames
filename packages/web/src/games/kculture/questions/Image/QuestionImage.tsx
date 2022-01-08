import React from 'react';

import './QuestionImage.style.scss';

export const QuestionImage = ({ question }: any) => (
    <img className="kculture__question-image" src={question.image} />
)
