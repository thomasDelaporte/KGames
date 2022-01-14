import React, { useState } from 'react';
import { AnswerWorld } from './AnswerWorld';

export default {
    title: 'Games/Geoquizz/Answers/World',
    component: AnswerWorld
}

export const Default = () => {

    const [ answer, setAnswer ] = useState();

    return (
        <AnswerWorld setAnswer={setAnswer} answer={answer} />
    )
}