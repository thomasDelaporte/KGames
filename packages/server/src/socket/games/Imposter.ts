import Container from 'typedi';
import { Player } from '../../entities';
import { ImposterService } from '../../services';
import { Game } from '../core/Game';

const msClock = process.env.NODE_ENV === 'production' ? 1000 : 1000;

export class Imposter extends Game {

    private undercoverService = Container.get(ImposterService);

    private rounds: Array<string>;
    private currentRound: number = 0;
    private currentUndercoverWord: string;
    private undercover: Player;

    private timer: number = 10;
    private clock: NodeJS.Timeout;

    public configuration: any = {
        words: 10,
        timesPerRound: 30
    }

    public start(): void {
        this.rounds = this.undercoverService.getWords(this.configuration.words);
        this.timer = 0;

        this.update();
    }

    public round(): void {

        const round = this.rounds[this.currentRound].split(':');
        const undercoverWord = round[ Math.floor(Math.random() * 2) ];
        const defaultWorld = round.filter(e => e !== undercoverWord );
        
        const undercoverIndex = Math.floor(Math.random() * this.room.players.size);

        let index = 0;
        this.room.players.forEach(player => {

            if(undercoverIndex === index)
                this.undercover = player;

            player.socket?.emit(JSON.stringify({ 
                event: 'round', 
                word: (undercoverIndex === index) ? undercoverWord : defaultWorld
            }));

            index++;
        });
        
        if(!this.clock) {
            this.clock = setInterval(this.update.bind(this), msClock);
        }
    }

    public update(): void {

        if(this.timer > 0) {

            this.timer -= 1;
            this.room.broadcast('timer', { time: this.timer });
        } else {

            this.timer = this.configuration.timesPerQuestion;
            this.round();
        }
    }
}