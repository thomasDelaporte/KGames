import React, { useState }from 'react';

import { AnswerOrder } from '..';

export default {
    title: 'Games/Kculture/Answers/Order',
    component: AnswerOrder
}

export const Default = () => {

    const [ response, setResponse ] = useState({ items: [
        'https://picsum.photos/200/300',
        'https://picsum.photos/200/300',
        'https://picsum.photos/200/300',
        'https://picsum.photos/200/300'
    ]});

    return (
        <AnswerOrder setResponse={setResponse} response={response} />
    )
}