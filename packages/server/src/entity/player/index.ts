import shortUUID from 'short-uuid';
import { Field, ObjectType } from 'type-graphql';
import { Lobby } from '..';
const translator = shortUUID();

@ObjectType()
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
  @Field()
  public id: string;
  @Field()
  public username: string;
  @Field(() => Lobby)
  public lobby: Lobby;
}
