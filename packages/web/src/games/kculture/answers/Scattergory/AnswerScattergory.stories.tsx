import React, { useState } from 'react';

import { AnswerScattergory } from './AnswerScattergory';

export default {
    title: 'Games/Kculture/Answers/Scattergory',
    component: AnswerScattergory
}

export const Default = () => {
    
    const [ response, setResponse ] = useState({});

    return (
        <AnswerScattergory response={response} setResponse={setResponse} disabled={false} />
    )
}