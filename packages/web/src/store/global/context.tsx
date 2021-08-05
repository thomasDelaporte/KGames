import { KGames } from './interface';
import React, { createContext } from 'react';

const state: KGames.Store = {
  player: null,
  lobby: null,
  redirection: null,
};

const KGamesContext = createContext({
  states: { state },
  actions: { dispatch: (actions: KGames.Action): void => {} },
}) as React.Context<KGames.Context>;

export { state as baseState, KGamesContext };
