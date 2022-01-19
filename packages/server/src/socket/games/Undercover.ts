import { Game } from '../core/Game';

export class Undercover extends Game {

    private rounds: Array<any>;

    public configuration: any = {
        rounds: 5,
        timePerRound: 5
    }

    public start(): void {
        // Method not implemented yet
    }

    public round(): void {

        const masterIndex: number = 0;
        const undercoverIndex: number = 1;

        const master = Array.from(this.room.players)[masterIndex];
        const undercover = Array.from(this.room.players)[undercoverIndex];

        this.room.players.forEach(player => {

            player.socket?.send(JSON.stringify({ 
                event: 'round',
                master: master.username
            }))
        });
    }
}