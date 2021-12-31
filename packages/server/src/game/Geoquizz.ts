import { Game } from './Game';
import { GeoquizzQuestionType } from '@kgames/common';

const questions = [
    { type: GeoquizzQuestionType.TEXT, question: 'Question textuel' },
    { type: GeoquizzQuestionType.AUDIO, question: 'Question audio', audio: 'https://freesound.org/data/previews/612/612673_11861866-lq.mp3' },
    { type: GeoquizzQuestionType.IMAGE, question: 'Question image', image: 'https://cdna.artstation.com/p/assets/images/images/036/415/176/large/jun-seong-park-juns-league-of-legends-orchestra-art-freljord.jpg?1617631996' },
    { type: GeoquizzQuestionType.BAC, question: 'Question BAC' },
    { type: GeoquizzQuestionType.ORDER, question: 'Order', items: [ 
        'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Swain_0.jpg',
        'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Seraphine_0.jpg',
        'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Kennen_0.jpg',
        'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Zyra_0.jpg'
    ] }
]

export class Geoquizz extends Game {

    private questionsPlayed: Set<any> = new Set();

    private questionInterval: NodeJS.Timeout;

    public start(): void {

        console.log('start game');

        this.hasStarded = true;

        this.pickQuestion();
        this.questionInterval = setInterval(this.pickQuestion.bind(this), 10000);
    }

    public reset(): void {
                
        this.questionsPlayed = new Set();
        clearInterval(this.questionInterval);

        this.start();
    }

    private pickQuestion() {

        if( questions.length === this.questionsPlayed.size )
            return clearInterval(this.questionInterval);

        let question = questions[Math.floor(Math.random() * questions.length)];
        
        while( this.questionsPlayed.has(question) )
            question = questions[Math.floor(Math.random() * questions.length)];

        this.questionsPlayed.add(question);
        this.lobby.broadcast('question', { ...question, number: this.questionsPlayed.size } );
    }
}