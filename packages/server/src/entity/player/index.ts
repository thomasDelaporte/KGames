import * as shortUUID from 'short-uuid';
const translator = shortUUID();

export class Player {
  public static Players: Map<string, Player> = new Map<string, Player>();

  public static create(username: string): Player {
    const id = translator.new().toString();
    const player = new Player();

    player.id = id;
    player.username = username;

    Player.Players.set(id, player);
    return player;
  }

  /**
   * Instance data
   */
  public id: string;
  public username: string;
}
