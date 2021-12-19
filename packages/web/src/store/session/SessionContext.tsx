import { Context, createContext } from 'react';

const defaultState: any = {};

export const SessionContext = createContext(defaultState);