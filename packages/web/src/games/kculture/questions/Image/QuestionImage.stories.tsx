import React from 'react';
import { QuestionImage } from '..';

export default {
    title: 'Games/Kculture/Questions/Image',
    component: QuestionImage
}

export const Default = () => (
    <QuestionImage question={{ image: 'https://picsum.photos/1000/500' }} />
)