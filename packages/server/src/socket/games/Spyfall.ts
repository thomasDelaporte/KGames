import Container from 'typedi';

import { Player } from '../../entities';
import { PlayerService, SpyfallService } from '../../services';
import { Game } from '../core/Game';

const msClock = process.env.NODE_ENV === 'production' ? 1000 : 1000;

export class Spyfall extends Game {

    private spyfallService = Container.get(SpyfallService);
    private playerService = Container.get(PlayerService);

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

    constructor() {
        super();

        this
            .on('selectlocation', this.onSpySelectLocation.bind(this))
            .on('guessspy', this.onGuessSpy.bind(this));
    }

    public start(): void {

        this.rounds = this.spyfallService.getRounds(this.configuration.rounds);
        this.timer = 0;

        const locations = this.spyfallService.getLocationsLocals();
        this.room.broadcast('locations', { locations });

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

            player.socket?.send(JSON.stringify({ 
                event: 'round', 
                round: {
                    location: (index === spyIndex) ? '?' : round.label, 
                    job: (index === spyIndex) ? 'Espion' : round.jobs[jobIndex]
                }
            }));

            index++;
        });

        this.clock = setInterval(this.update.bind(this), msClock);
    }

    private update(): void {

        if(this.timer > 0) {
            this.timer -= 1;
        } else {
            this.timer = this.configuration.timePerRound * 60;
            this.round();
        }

        this.room.broadcast('timer', { time: this.timer });
    }

    private onGuessSpy(data: any, player: Player) {

        if(player.id === data.player)
            return false;

        const playerGuessed = this.playerService.getPlayer(data.player);

        if(playerGuessed === null)
            throw new Error('Player with id does not exist.');

        this.votes = {};
        this.room.broadcast('showvote', { vote: { from: player.username, to: playerGuessed.username } });
    }

    private onVote(data: any, player: Player) {
        this.votes[player.id] = data.vote;
    }

    private onSpyGuessLocation(data: any, player: Player) {

        if(this.roundSpy !== player)
            return false;

        this.room.broadcast('showguess');
    }

    private onSpySelectLocation(data: any, player: Player) {
        
        if(this.roundSpy !== player)
            return false;

        this.room.broadcast('selectlocation', { location: data.location });
    }
}