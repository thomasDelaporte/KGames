import React from 'react';

import './QuestionFlag.style.scss';

export const QuestionFlag = ({ room, number }: any) => {
    return (
        <img className="question-flag" src={import.meta.env.VITE_API + '/geoquizz/flag/' + room + '?' + number} />
    )
}