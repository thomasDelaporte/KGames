import React from 'react';
import { Question } from './Question';

export const QuestionImage = ({ question: any }) => (
    <Question question={question}>
        <img className="geoquizz__question__image" src={question.image} />
    </Question>
)
