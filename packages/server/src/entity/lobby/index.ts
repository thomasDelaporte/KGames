import shortUUID from 'short-uuid';
import { Field, ObjectType } from 'type-graphql';
import { GameMode } from '../../module';
import { Player } from '../player';

const translator = shortUUID();

@ObjectType()
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
  @Field()
  public id: string;
  @Field(() => Player)
  public owner: Player;
  @Field(() => Number)
  public mode: GameMode; // <=== Game Mode

  public players: Player[] = [];

  public addPlayer(player: Player) {
    this.players.push(player);
  }
}
