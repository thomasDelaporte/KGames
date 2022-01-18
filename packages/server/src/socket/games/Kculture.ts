import Container from 'typedi';

import { Game } from '../core/Game';
import { Player } from '../../entities';
import { KcultureService } from '../../services/KcultureService';

const msClock = process.env.NODE_ENV === 'production' ? 1000 : 100;

export class Kculture extends Game {

    private kcultureService: KcultureService = Container.get(KcultureService);

    public configuration: any = {
        theme: 'Thème de dinguo', // Default theme not used 
        time: 30, // 10 seconds per question,
        questions: 5
    };

    private timer: number;
    private clock: NodeJS.Timeout;

    private currentQuestion: number = 1;
    private currentUserChecking: number = 0;

    private questions: any = [];
    private questionsPlayed: Set<any> = new Set();

    private answers: any = {};
    private scores: any = {};

    private validAnswer: boolean = false;

    constructor() {
        super();

        this.on('response', this.onResponse.bind(this))
            .on('validquestion', this.onValidQuestion.bind(this))
            .on('togglevalidity', this.onToggleValidity.bind(this));

    }

    public start(): void {

        console.log('[GEOQUIZZ] Start game on Room: ', this.room.id, ' with players:', this.room.players.size);

        this.timer = this.configuration.time;
        this.answers = {};
        this.questionsPlayed = new Set();
        this.hasStarded = true;
        this.currentQuestion = 0;
        this.currentUserChecking = 0;

        this.questions = this.kcultureService.getQuestions(this.configuration.theme);
      
        this.pickQuestion();
        this.update();
    }

    public reset(): void {

        this.answers = {};
        this.scores = {};
        this.questionsPlayed = new Set();
        
        console.log('[GEOQUIZZ] Reset game on Room: ', this.room.id);
        clearInterval(this.clock);
    }

    protected pickQuestion(): void {

        if( this.questions.length === this.questionsPlayed.size ) {
            console.log('GO AU REPONSE INDIVI', this.answers);

            this.currentQuestion = 0;
            this.pickResult();

            return clearInterval(this.clock);
        }

        let question = this.questions[Math.floor(Math.random() * this.questions.length)];
        
        while( this.questionsPlayed.has(question) )
            question = this.questions[Math.floor(Math.random() * this.questions.length)];

        this.questionsPlayed.add(question);

        // Hide answer to the player, and clone the object so we keep the data on the main array.
        question = Object.assign({}, question);
        delete question.answer;

        this.clock = setInterval(this.update.bind(this), msClock);
        this.room.broadcast('question', { question: { ...question, number: this.currentQuestion + 1 } });
    }

    protected retrieveAnswer(): void {
        this.room.broadcast('questionretrieve');
    }

    protected pickResult(): void {

        console.log('checking result', this.currentQuestion, this.currentUserChecking);

        const question = Array.from(this.questionsPlayed)[this.currentQuestion];
        const answersOfCurrentQuestion = this.answers[this.currentQuestion];
        const userChecking = Array.from(this.room.players)[this.currentUserChecking];
        
        const answer = answersOfCurrentQuestion[userChecking.id];
        console.log(Object.keys(answersOfCurrentQuestion).length, this.currentUserChecking)

        this.room.broadcast('updatestep', { step: 5, 
            question: { ...question, number: this.currentQuestion + 1, username: userChecking.username }, answer });

        if( this.currentUserChecking < Object.keys(answersOfCurrentQuestion).length - 1 ) {
            this.currentUserChecking += 1;
        } else {
            this.currentUserChecking = 0;
            this.currentQuestion += 1;
        }
    }

    protected update(): void {

        if(this.timer > 0) {

            this.timer -= 1;
            this.room.broadcast('timer', { time: this.timer });
        } else {

            this.timer = this.configuration.time;
            this.retrieveAnswer();
            clearInterval(this.clock);
        }
    }

    protected onResponse({ response }: any, player: Player): void {

        if(!this.answers[this.currentQuestion])
            this.answers[this.currentQuestion] = [];

        this.answers[this.currentQuestion][player.id] = response;

        if(Object.keys(this.answers[this.currentQuestion]).length === this.room.players.size) {
            console.log('next question');

            this.currentQuestion += 1;
            this.pickQuestion();
        }
    }

    protected onValidQuestion(): void {

        const userChecking = Array.from(this.room.players)[this.currentUserChecking];

        if(!this.scores[ userChecking.id ])
            this.scores[ userChecking.id ] = {
                username: Array.from(this.room.players).find(e => e.id === userChecking.id)?.username,
                score: 0
            };

        this.scores[ userChecking.id ].score += (this.validAnswer) ? 1 : 0
        
        if( this.currentQuestion + 1 > Object.keys(this.answers).length ) {
                
            const sortedArr = Object.entries(this.scores)
                .sort(([, v1]: any, [, v2]: any) => v2 - v1);

            const scores = Object.fromEntries(sortedArr);
            this.room.broadcast('scores', { scores } );
        } else {
            this.validAnswer = false;
            this.pickResult();
        }
    }
    
    protected onToggleValidity({ valid }: any): void {
        this.validAnswer = valid;
        this.room.broadcast('togglevalidity', { valid: this.validAnswer });
    }
}