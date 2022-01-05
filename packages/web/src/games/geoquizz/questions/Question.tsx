import React from 'react';

export const Question = ({ question, children }: { question: any, children?: React.ReactNode }) => (
    <div className="geoquizz__question" data-question={question.number}>
        <h3>{question.question}</h3>
        {children}
    </div>
)