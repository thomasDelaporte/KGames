import React from 'react';
import { QuestionAudio } from './QuestionAudio';

export default {
    title: 'Games/Kculture/Questions/Audio',
    component: QuestionAudio
}

export const Default = () => (
    <QuestionAudio question={{ audio: '' }} />
)