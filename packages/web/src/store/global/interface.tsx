export namespace KGames {
  export type Action = { type: string } & Record<string, any>;

  export type ActionHandler = (
    state: KGames.Store,
    actions: Action
  ) => KGames.Store;

  export enum GameMode {
    GEOQUIZZ,
    IMPOSTEUR,
    INFILTRER,
    KCULTURE,
    SPYFALL,
  }

  export interface Lobby {
    id: string;
    owner: Player;
    mode: GameMode;
    participants: Player[];
  }

  export interface Player {
    id: string;
    username: string;
  }

  export interface Store {
    player: null | Player;
    lobby: null | Lobby;
    redirection: null | string;
  }

  export interface Context {
    states: { state: Store };
    actions: { dispatch: (actions: Action) => void };
  }
}
