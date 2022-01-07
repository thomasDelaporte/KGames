import { Game } from './Game';
import { GeoquizzQuestionType } from '@kgames/common';
import { Player } from '../entity';

/**
 *     { type: GeoquizzQuestionType.TEXT, question: 'Question textuel' },
    { type: GeoquizzQuestionType.AUDIO, question: 'Question audio', audio: 'https://freesound.org/data/previews/612/612673_11861866-lq.mp3' },
    { type: GeoquizzQuestionType.IMAGE, question: 'Question image', image: 'https://cdna.artstation.com/p/assets/images/images/036/415/176/large/jun-seong-park-juns-league-of-legends-orchestra-art-freljord.jpg?1617631996' },
    { type: GeoquizzQuestionType.ORDER, question: 'Ranger dans lordre', items: [
        { id: 'swain', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Swain_0.jpg' },
        { id: 'seraphine', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Seraphine_0.jpg' },
        { id: 'kennen', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Kennen_0.jpg' },
        { id: 'zyra', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Zyra_0.jpg' }
    ] },
 */
const questions = [
    { type: GeoquizzQuestionType.MARKER, question: 'Marquer ahah' }
]

const msClock = process.env.NODE_ENV === 'production' ? 1000 : 1000;

export class Geoquizz extends Game {

    public configuration: any = {
        theme: 'default', // Default theme not used 
        time: 10 // 10 seconds per question
    };

    private timer: number;
    private clock: NodeJS.Timeout;

    private currentQuestion: number = 1;
    private currentUserChecking: number = 0;

    private questionsPlayed: Set<any> = new Set();
    private answers: any = {};
    private scores: any = {};

    private validAnswer: boolean = false;

    public start(): void {

        console.log('[GEOQUIZZ] Start game on Room: ', this.room.id, ' with players:', this.room.players.size);

        this.timer = this.configuration.time;
        this.answers = {};
        this.questionsPlayed = new Set();
        this.hasStarded = true;
        this.currentQuestion = 0;
        this.currentUserChecking = 0;

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

        if( questions.length === this.questionsPlayed.size ) {
            console.log('GO AU REPONSE INDIVI', this.answers);

            this.currentQuestion = 0;
            this.pickResult();

            return clearInterval(this.clock);
        }

        let question = questions[Math.floor(Math.random() * questions.length)];
        
        while( this.questionsPlayed.has(question) )
            question = questions[Math.floor(Math.random() * questions.length)];

        this.questionsPlayed.add(question);

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
            question: { ...question, number: this.currentQuestion + 1 }, answer: { answer, username: userChecking.username } });

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

    public on(action: string, data: any, player: Player): void {
        
        console.log(action, data);

        if(action === 'response') {
            
            // On récupére les réponses des gens & si c'est good on relance le jeu
            console.log('Retrieve response of user', player.username, data);
            
            if(!this.answers[this.currentQuestion])
                this.answers[this.currentQuestion] = [];

            this.answers[this.currentQuestion][player.id] = data.response;

            if(Object.keys(this.answers[this.currentQuestion]).length === this.room.players.size) {
                console.log('next question');

                this.currentQuestion += 1;
                this.pickQuestion();
            }
        } else if(action === 'validquestion') {

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
                this.pickResult();
            }
        } else if(action === 'togglevalidity') {
            this.validAnswer = data.valid;
            this.room.broadcast('togglevalidity', { valid: this.validAnswer });
        }
    }
}