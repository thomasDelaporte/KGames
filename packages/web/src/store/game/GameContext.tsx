import { createContext } from 'react';

const defaultState: any = {};

export type GameContext = {
    step: number,
    websocket: WebSocket,
    owner: boolean
}

export const GameContext = createContext(defaultState);