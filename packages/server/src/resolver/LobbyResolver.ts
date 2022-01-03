import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';

import { Lobby } from '../entity';
import { LobbyService } from '../services';

@Service()
@Resolver(of => Lobby)
export class LobbyResolver {

    @Inject()
    private readonly lobbyService: LobbyService;

    @Authorized()
    @Mutation(() => Lobby)
    createLobby(@Ctx() context: any): Lobby {
        return this.lobbyService.createLobby(context.player);
    }

    @Query(() => Lobby, { nullable: true })
    getLobby(@Arg('id') id: string): null | Lobby {
        return this.lobbyService.getLobby(id);
    }

    @Query(() => [Lobby])
    getLobbies(): Lobby[] {
        return this.lobbyService.getLobbies();
    }

    @Mutation(() => [Lobby])
    clearLobbies() {
        return this.lobbyService.clearLobbies();
    }
}
