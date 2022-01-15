import Container from 'typedi';
import { GeoquizzService } from '../services';
import { Game } from './Game';

export class Geoquizz extends Game {

    private geoquizzService = Container.get(GeoquizzService);

    private currentQuestion: number = 0;
    private questions: Array<any>;

    private timer: number = 10;
    private clock: NodeJS.Timeout;

    public configuration: any = {
        questionCountries: 5,
        questionFlags: 5,
        questionCapitals: 5
    }

    public start(): void {
        
        this.questions = this.geoquizzService.getQuestions(
            this.configuration.questionCountries, this.configuration.questionFlags, this.configuration.questionCapitals);

        this.pickQuestion();
        this.update();
    }

    public reset(): void {
        //throw new Error('Method not implemented.');
    }

    private update(): void {

        if(this.timer > 0) {

            this.timer -= 1;
            this.room.broadcast('timer', { time: this.timer });
        } else {

            this.timer = 10;
            this.pickQuestion();
            clearInterval(this.clock);
        }
    }

    private pickQuestion(): void {

        const question = Object.assign({}, this.questions[this.currentQuestion]);
        delete question.answer;

        this.clock = setInterval(this.update.bind(this), 1000);
        this.room.broadcast('question', { question });

        this.currentQuestion += 1;
    }
}