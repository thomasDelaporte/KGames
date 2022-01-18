import Container from 'typedi';

import { Player } from '../../entities';
import { SpyfallService } from '../../services';
import { Game } from '../core/Game';

const msClock = process.env.NODE_ENV === 'production' ? 1000 : 1000;

export class Spyfall extends Game {

    private spyfallService = Container.get(SpyfallService);

    private timer: number;
    private clock: NodeJS.Timeout;

    private rounds: Array<{ label: string, jobs: Array<string> }>;
    private currentRound: number = 0;
    private roundSpy: Player;
    private votes: Record<string, boolean>;
  
    public configuration: any = {
        rounds: 2,
        timePerRound: 10
    }

    public start(): void {

        this.rounds = this.spyfallService.getRounds(this.configuration.rounds);
        this.timer = 0;

        this.room.broadcast('locations', this.spyfallService.getLocationsLocals());
        this.update();
    }

    private round(): void {

        const round = this.rounds[this.currentRound];
        const spyIndex = Math.floor(Math.random() * this.room.players.size);
        const jobIndex = Math.floor(Math.random() * round.jobs.length);

        let index: number = 0;
        this.room.players.forEach((player) => {

            if(index === spyIndex)
                this.roundSpy = player;

            player.socket?.emit(JSON.stringify({ 
                event: 'round', 
                round: (index === spyIndex) ? '?' : round.label, 
                job: (index === spyIndex) ? 'Espion' : round.jobs[jobIndex]
            }));

            index++;
        });

        this.clock = setInterval(this.update.bind(this), msClock);
    }

    private update(): void {

        if(this.timer > 0) {

            this.timer -= 1;
            this.room.broadcast('timer', { time: this.timer });
        } else {

            this.timer = this.configuration.timePerRound * 60;
            this.round();
        }
    }

    private onGuessSpy(data: any, player: Player) {
        this.votes = {};
        this.room.broadcast('showvote', { from: player.username, to: data.username });
    }

    private onVote(data: any, player: Player) {
        this.votes[player.id] = data.vote;
    }

    private onSpyGuessLocation(data: any, player: Player) {

        if(this.roundSpy !== player)
            return false;

        this.room.broadcast('showguess');
    }

    private onSpyChooseLocation(data: any, player: Player) {
        
        if(this.roundSpy !== player)
            return false;

        this.room.broadcast('spyselect', { location: data.location });
    }
}