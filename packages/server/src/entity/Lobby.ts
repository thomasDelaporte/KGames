import { Field, ObjectType } from 'type-graphql';
import { Player } from './Player';
import { GameMode } from '@kgames/common';

@ObjectType()
export class Lobby {

    @Field()
    public id: string;

    @Field(() => Player)
    public owner: Player;

    @Field(() => Number)
    public mode: GameMode = GameMode.GEOQUIZZ;
}
