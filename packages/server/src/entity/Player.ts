import { Socket } from 'dgram';
import { Field, ObjectType } from 'type-graphql';
import WebSocket from 'ws';
import { Lobby } from './Lobby';

@ObjectType()
export class Player {

    @Field()
    public id: string;

    @Field()
    public username: string;

    @Field(() => Lobby, { nullable: true })
    public lobby?: Lobby;
    
    public socket?: WebSocket;

    joinLobby(lobby: Lobby, socket: WebSocket) {

        if(this.lobby === lobby && this.socket) {
            console.log('should close the connection with the first websocket but not leave the lobby');
        }
        
        this.lobby = lobby;
		this.socket = socket;
	}
}
