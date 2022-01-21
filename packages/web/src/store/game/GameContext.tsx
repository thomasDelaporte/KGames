import { createContext } from 'react';

const defaultState: any = {};

export type GameContext = {
    step: number,
    websocket: WebSocket,
    owner: boolean,
    configuration: any,
    id: string,
    setStep: any,
    players: Array<any>
}

export const GameContext = createContext(defaultState);