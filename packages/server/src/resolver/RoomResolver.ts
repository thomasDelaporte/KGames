import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Inject, Service } from 'typedi';

import { Room } from '../entity';
import { RoomService } from '../services';

@Service()
@Resolver(of => Room)
export class RoomResolver {

    @Inject()
    private readonly RoomService: RoomService;

    @Authorized()
    @Mutation(() => Room)
    createRoom(@Ctx() context: any): Room {
        return this.RoomService.createRoom(context.player);
    }

    @Query(() => Room, { nullable: true })
    getRoom(@Arg('id') id: string): null | Room {
        return this.RoomService.getRoom(id);
    }

    @Query(() => [Room])
    getLobbies(): Room[] {
        return this.RoomService.getLobbies();
    }

    @Mutation(() => [Room])
    clearLobbies() {
        return this.RoomService.clearLobbies();
    }
}
