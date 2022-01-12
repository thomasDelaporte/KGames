import { GeoquizzQuestionType } from '@kgames/common';
import { Service } from 'typedi';

@Service()
export class KcultureService {

    private questions: {} = {
        'default': [
            { type: GeoquizzQuestionType.BAC, question: 'BAC avec la lettre B' },
            { type: GeoquizzQuestionType.TEXT, question: 'Question textuel', answer: 'La réponse' },
            { type: GeoquizzQuestionType.AUDIO, question: 'Question audio', audio: 'https://freesound.org/data/previews/612/612673_11861866-lq.mp3', answer: 'Réponse audio' },
            { type: GeoquizzQuestionType.IMAGE, question: 'Question image', image: 'https://cdna.artstation.com/p/assets/images/images/036/415/176/large/jun-seong-park-juns-league-of-legends-orchestra-art-freljord.jpg?1617631996', answer: 'Réponse image' },
            { type: GeoquizzQuestionType.ORDER, question: 'Ranger dans lordre', items: [
                { id: 'swain', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Swain_0.jpg' },
                { id: 'seraphine', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Seraphine_0.jpg' },
                { id: 'kennen', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Kennen_0.jpg' },
                { id: 'zyra', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Zyra_0.jpg' }
            ], answers: [
                { id: 'zyra', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Zyra_0.jpg' },
                { id: 'swain', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Swain_0.jpg' },
                { id: 'seraphine', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Seraphine_0.jpg' },
                { id: 'kennen', image: 'https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Kennen_0.jpg' },
            ] },
        ],

        'other_theme': [],
        'another_one': []
    }

    get themes() {
        return Object.keys(this.questions);
    }
}