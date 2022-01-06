import { Field, ObjectType } from 'type-graphql';
import { WebSocket } from 'ws';
import { Room } from './Room';

@ObjectType()
export class Player {

    @Field()
    public id: string;

    @Field()
    public username: string;

    @Field(() => Room, { nullable: true })
    public room?: Room;
    
    public socket?: WebSocket;
}
