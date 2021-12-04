import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Lobby, Player } from '../../entity';
import jwt from 'jsonwebtoken';
import { GameMode } from '../../module';

@Resolver()
export class UserResolver {
  @Authorized() // ce decorateur est la pour ça
  @Query(() => Player, { nullable: true })
  me(@Ctx() context: { req: any; res: any }): Player {
    const player = Player.Players.get(context.req.user.id) as Player;

    return player;
  }

  @Mutation(() => String, { nullable: true })
  auth(@Arg('username') username: string): string | null {
    const player = Player.create(username) as Player;
    player.lobby = Lobby.create(player, GameMode.GEOQUIZZ);

    const token = jwt.sign(
      { id: player.id },
      process.env.SESSION_SECRET as string,
      { algorithm: 'HS256', expiresIn: '2h' }
    );

    return token;
  }
}
