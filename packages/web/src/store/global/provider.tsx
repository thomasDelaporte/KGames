import { KGames } from './interface';
import { KGamesContext, baseState } from './context';
import React, { useReducer } from 'react';

const actionHandler: Map<string, KGames.ActionHandler> = new Map<
  string,
  KGames.ActionHandler
>();

actionHandler.set('set-login-redirection', (state, action) => {
  console.log("On login you'll be redirected to : ", action.path);
  return {
    ...state,
    redirection: action.path,
  };
});

function reducer(state: KGames.Store, actions: KGames.Action): KGames.Store {
  const handler = actionHandler.get(actions.type);
  if (handler) return handler(state, actions);
  return state;
}

export function KGamesProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, baseState);

  const value: KGames.Context = {
    states: { state },
    actions: { dispatch },
  };

  return (
    <KGamesContext.Provider value={value}>
      {props.children}
    </KGamesContext.Provider>
  );
}
