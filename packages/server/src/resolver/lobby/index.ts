import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Lobby } from '../../entity';

@Resolver()
export class LobbyResolver {
  @Mutation(() => String)
  createLobby(): string {
    return 'create lobby';
  }
  @Query(() => Lobby, { nullable: true })
  getLobby(@Arg('id') id: string): null | Lobby {
    const lobby = Lobby.Lobbies.get(id);
    if (lobby) return lobby;
    return null;
  }
}
