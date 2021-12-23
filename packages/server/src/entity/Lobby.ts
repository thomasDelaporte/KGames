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

    @Field(() => [Player])
    public players: Set<Player> = new Set();

    public step: number = 0;

    public getPlayers(): {} {
        return Array.from(this.players).map((p: Player) => ({
            username: p.username,
            owner: p === this.owner
        }))
    }

    leaveLobby(player: Player): void {

        player.lobby = undefined;
        this.players.delete(player);

        if(this.players.size === 0)
            console.log('should delete ?');

        let hasNewOwner = false;

        this.players.forEach((p) => {

            if(!hasNewOwner && this.owner === player) {
                this.owner = p;
                hasNewOwner = true;
                p.socket?.send(JSON.stringify({ event: 'updateowner', owner: true }))
            }

            p.socket?.send(JSON.stringify({ event: 'playerupdate', players: this.getPlayers() }))
        });
	}

    addPlayer(player: Player) {
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
