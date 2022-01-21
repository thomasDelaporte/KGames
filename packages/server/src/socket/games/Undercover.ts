import Container from 'typedi';
import { Player } from '../../entities';
import { ImposterService } from '../../services';
import { Game } from '../core/Game';

const msClock = process.env.NODE_ENV === 'production' ? 1000 : 1000;

export class Undercover extends Game {

    private undercoverService = Container.get(ImposterService);

    private rounds: Array<string>;
    private words: Record<string, Array<string>>;

    private currentRound: number = 0;
    private currentTurn: number = 0;
    private currentUndercoverWord: string;
    private undercover: Player;

    private timer: number = 10;
    private clock: NodeJS.Timeout;

    public configuration: any = {
        words: 10,
        timesPerRound: 30
    }

    constructor() {
        super();

        this.on('word', this.onWord.bind(this));
    }

    public start(): void {
        this.rounds = this.undercoverService.getWords(this.configuration.words);
        this.timer = this.configuration.timesPerRound;

        this.round();
        this.turn();
    }

    public round(): void {

        const round = this.rounds[this.currentRound].split(':');
        this.currentUndercoverWord = round[ Math.floor(Math.random() * 2) ];
        const defaultWorld = round.filter(e => e !== this.currentUndercoverWord );
        
        const undercoverIndex = Math.floor(Math.random() * this.room.players.size);
        
        this.words = {};

        let index = 0;
        this.room.players.forEach(player => {

            if(undercoverIndex === index)
                this.undercover = player;

            player.socket?.send(JSON.stringify({ 
                event: 'round', 
                round: {
                    word: (undercoverIndex === index) ? this.currentUndercoverWord : defaultWorld,
                    number: this.currentRound + 1
                }
            }));

            index++;
        });
        
        if(!this.clock) {
            this.clock = setInterval(this.update.bind(this), msClock);
        }
    }

    public turn(): void {

        if(this.currentRound + 2 >= this.rounds.length) {
            console.log('DOOMED');
            return clearInterval(this.clock);
        }

        const players = Array.from(this.room.players);

        console.log('Nombre de joueurs', players.length);
        console.log('Current round', this.currentRound);
        console.log('Current turn', this.currentTurn);

        if(this.currentTurn < players.length - 1) {
            this.currentTurn += 1;
        } else {
            this.currentTurn = 0;
            this.currentRound += 1;

            this.round();
        }

        const playerTurn = players[this.currentTurn];

        if(playerTurn == null) {
            return clearInterval(this.clock);
        }

        this.room.broadcast('turn', { turn: playerTurn.id });
    }

    public update(): void {

        if(this.timer > 0) {
            this.timer -= 1;
        } else {
            this.timer = this.configuration.timesPerRound;
            this.turn();
        }

        this.room.broadcast('timer', { time: this.timer });
    }

    private onWord({ word }: { word: string }, player: Player) {

        if(!this.words[player.id])
            this.words[player.id] = [];

        this.words[player.id].push(word);
        this.timer = this.configuration.timesPerRound;

        this.room.broadcast('timer', { time: this.timer });
        this.room.broadcast('words', { words: this.words });

        this.turn();
    }
}