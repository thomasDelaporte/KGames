import * as shortUUID from 'short-uuid';
import { GameMode } from '../../module';
import { Player } from '../player';

const translator = shortUUID();

export class Lobby {
  public static Lobbies: Map<string, Lobby> = new Map<string, Lobby>();

  public static create(player: Player, mode: GameMode): Lobby {
    const id = translator.new().toString();
    const lobby = new Lobby();

    lobby.id = id;
    lobby.owner = player;
    lobby.mode = mode;

    Lobby.Lobbies.set(id, lobby);
    return lobby;
  }
  /**
   * Instance data
   */

  public id: string;
  public owner: Player;
  public mode: GameMode; // <=== Game Mode
}
