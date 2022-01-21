import React, { useState } from 'react';

import { AnswerMarker } from '..';

export default {
    title: 'Games/Kculture/Answers/Marker',
    component: AnswerMarker
}

export const Default = () => {

    const [ response, setResponse ] = useState({});

    return (
        <AnswerMarker question={{ image: 'https://picsum.photos/1000/600' }} response={response} setResponse={setResponse} />
    )
}