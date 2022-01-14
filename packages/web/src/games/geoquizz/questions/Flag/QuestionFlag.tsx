import React from 'react';

export const QuestionFlag = () => {
    return (
        <img className="kculture__question-flag" src={import.meta.env.VITE_API + '/geoquizz/flag/example'} />
    )
}