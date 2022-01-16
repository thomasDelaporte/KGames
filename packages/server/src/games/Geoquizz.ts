import { GeoquizzQuestionType } from '@kgames/common';
import Container from 'typedi';
import { Player } from '../entities';
import { GeoquizzService } from '../services';
import { Game } from './Game';

export class Geoquizz extends Game {

    private geoquizzService = Container.get(GeoquizzService);

    private currentQuestion: number = -1;
    private currentUserChecking: number = 0;
    private questions: Array<any>;

    private timer: number = 10;
    private clock: NodeJS.Timeout;
    
    private answers: any = [];
    private scores: any = {};

    public configuration: any = {
        questionCountries: 1,
        questionFlags: 1,
        questionCapitals: 1
    }

    public start(): void {
        
        this.questions = this.geoquizzService.getQuestions(
            this.configuration.questionCountries, this.configuration.questionFlags, this.configuration.questionCapitals);
        this.hasStarded = true;

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
        }
    }

    private pickQuestion(): void {

        this.currentQuestion += 1;

        if(this.currentQuestion >= this.questions.length) {

            this.currentQuestion = -1;

            this.room.step = 5;
            this.pickResult();
            return clearInterval(this.clock);
        } 

        const question = Object.assign({ number: this.currentQuestion + 1 }, this.questions[this.currentQuestion]);
        delete question.answer;
        delete question.flag;

        if(!this.clock)
            this.clock = setInterval(this.update.bind(this), 500);

        this.room.broadcast('question', { question });
        this.answers[this.currentQuestion] = {};
    }

    private pickResult(): void {

        this.currentQuestion += 1;

        const question = this.questions[this.currentQuestion];
        const answersOfCurrentQuestion = this.answers[this.currentQuestion];
        const currentUser = Array.from(this.room.players)[this.currentUserChecking];

        if(currentUser === null)
            return;

        let answer = undefined;

        if(answersOfCurrentQuestion && answersOfCurrentQuestion[currentUser.id])
            answer = answersOfCurrentQuestion[currentUser.id];

        if(!this.scores[currentUser.id])
            this.scores[currentUser.id] = {
                username: currentUser.username,
                score: 0
            };

        if(answer && question.answer) {
            this.scores[currentUser.id].score += (String(answer).toLocaleLowerCase() === String(question.answer).toLocaleLowerCase()) ? 1 : 0;
        }

        this.room.broadcast('resultquestion', { question: { ...question, number: this.currentQuestion + 1, username: currentUser.username }, answer });

        if( this.currentUserChecking < Object.keys(answersOfCurrentQuestion).length - 1 ) {
            this.currentQuestion -= 1;
            this.currentUserChecking += 1;
        } else {
            this.currentUserChecking = 0;
        }
    }

    public on(action: string, data: any, player: Player): void {

        if(action === 'answer' && this.room.step !== 5) {
            this.answers[this.currentQuestion][player.id] = data.answer;
        } else if(action === 'nextquestion') {

            if( this.currentQuestion + 1 > Object.keys(this.answers).length ) {

                const sortedArr = Object.entries(this.scores)
                .sort(([, v1]: any, [, v2]: any) => v2 - v1);

                const scores = Object.fromEntries(sortedArr);
                this.room.broadcast('scores', { scores } );
            } else {
                this.pickResult();
            }
        }
    }

    public getCurrentFlag() {

        console.log(this.questions, this.currentQuestion);
        if(this.questions[this.currentQuestion].type !== GeoquizzQuestionType.FLAG)
            return false;

        return this.questions[this.currentQuestion].flag;
    }
}