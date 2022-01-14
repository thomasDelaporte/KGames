import { KcultureQuestionType } from '@kgames/common';
import { Service } from 'typedi';

@Service()
export class KcultureService {

    private questions: Record<string, Array<any>> = {
        'Thème de dinguo': [
            { type: KcultureQuestionType.BAC, question: 'BAC avec la lettre B' },
            { type: KcultureQuestionType.TEXT, question: 'Question textuel', answer: 'La réponse' },
            { type: KcultureQuestionType.AUDIO, question: 'Question audio', audio: 'https://freesound.org/data/previews/612/612673_11861866-lq.mp3', answer: 'Réponse audio' },
            { type: KcultureQuestionType.IMAGE, question: 'Question image', image: 'https://cdna.artstation.com/p/assets/images/images/036/415/176/large/jun-seong-park-juns-league-of-legends-orchestra-art-freljord.jpg?1617631996', answer: 'Réponse image' },
            { type: KcultureQuestionType.ORDER, question: 'Ranger dans lordre', items: [
                { id: 'swain', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Swain_0.jpg' },
                { id: 'seraphine', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Seraphine_0.jpg' },
                { id: 'kennen', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Kennen_0.jpg' },
                { id: 'zyra', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Zyra_0.jpg' }
            ], answer: [
                { id: 'zyra', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Zyra_0.jpg' },
                { id: 'swain', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Swain_0.jpg' },
                { id: 'seraphine', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Seraphine_0.jpg' },
                { id: 'kennen', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Kennen_0.jpg' },
            ] },
        ],

        'Autre thème vide': [],
        'Un autre truc vide': []
    }

    public getQuestions(theme: string, excluded?: {}): Array<any> {
        return this.questions[theme];
    }

    get themes() {
        return Object.keys(this.questions);
    }
}