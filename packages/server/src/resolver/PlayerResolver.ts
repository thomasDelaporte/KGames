import { ForbiddenError } from 'apollo-server';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';

import { Player } from '../entity';
import { PlayerService } from '../services';

@Service()
@Resolver(of => Player)
export class PlayerResolver {

    @Inject()
    private readonly playerService: PlayerService;

    @Query(() => Player, { nullable: true })
    me(@Ctx() context: any): Player | null {
        
        if(context.player === undefined)
            throw new ForbiddenError('No user found with your session data.');
        
        return context.player;
    }

    @Mutation(() => String)
    auth(@Arg('username') username: string): string {
        return this.playerService.authenticate(username).token;
    }
}
