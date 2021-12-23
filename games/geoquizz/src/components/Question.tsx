import React from 'react';

export const Question = ({ question: {}, children: React.ReactNode }) => (
    <div className="geoquizz__question" data-question={question.number}>
        <h3>{question.number}</h3>
        {children}
    </div>
)