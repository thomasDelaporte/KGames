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

    @Field(() => String, { nullable: true })
    public picture: string | null;
    
    public socket?: WebSocket;

    connectToSocket(socket: import('ws')): void {
		this.socket = socket;
	}
}
