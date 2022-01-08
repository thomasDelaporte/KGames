import React from 'react';

import { LobbyScores } from './LobbyScores';

export default {
    title: 'Components/Lobby/Scores',
    component: LobbyScores
}

export const Default = () => (
    <LobbyScores scores={[
        { score: 20, username: 'Username 1' },
        { score: 12, username: 'Username 2' },
        { score: 10, username: 'Username 3' },
        { score: 2, username: 'Username 4' }
    ]} />
)