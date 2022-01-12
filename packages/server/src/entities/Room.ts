import { Field, ObjectType } from 'type-graphql';
import { Player } from './Player';
import { GameMode } from '@kgames/common';
import { Game } from '../games/Game';
import Container from 'typedi';
import { RoomService } from '../services';

@ObjectType()
export class Room {

    @Field()
    public id: string;

    @Field(() => Player)
    public owner: Player;

    @Field(() => Number)
    public mode: GameMode = GameMode.GEOQUIZZ;

    @Field(() => [Player])
    public players: Set<Player> = new Set();

    public step: number = 0;

    public selectedGame: string;
    public currentGame: Game;
    
    public games: Game[] = [];

    public getPlayers(): {} {
        return Array.from(this.players).map((p: Player) => ({
            username: p.username,
            owner: p === this.owner
        }))
    }

    leaveRoom(player: Player): void {

        player.room = undefined;
        this.players.delete(player);

        let hasNewOwner = false;
        this.players.forEach((p) => {

            if(!hasNewOwner && this.owner === player) {
                this.owner = p;
                hasNewOwner = true;
                p.socket?.send(JSON.stringify({ event: 'updateowner', owner: true }))
            }

            p.socket?.send(JSON.stringify({ event: 'playerupdate', players: this.getPlayers() }))
        });

        if(this.players.size === 0) {
            setTimeout(() => {

                if(this.players.size === 0)
                    Container.get(RoomService).deleteRoom(this.id);
            })
        }
	}

    addPlayer(player: Player) {

        if(this.players.has(player))
           return;
    
        
        player.room = this;
		this.players.add(player);

        this.players.forEach(player => {
            player.socket?.send(JSON.stringify({ event: 'playerupdate', players: this.getPlayers() }))
        });
	}

    broadcast(event: string, args?: {}) {

        if(args === undefined)
            args = {}

		this.players.forEach(player => {
            player.socket?.send(JSON.stringify({ event, ...args }));
        });
	}
}
