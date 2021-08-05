import { useContext } from 'react';
import { KGamesContext } from './context';
import { KGames } from './interface';

export function useKGames(): KGames.Context {
  return useContext(KGamesContext);
}
