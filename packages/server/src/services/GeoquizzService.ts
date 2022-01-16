import { GeoquizzQuestionType } from '@kgames/common';
import { Service } from 'typedi';

import countries from '../../ressources/countries_5m.json';

@Service()
export class GeoquizzService {

    public getQuestions(questionCountries: number, questionFlags: number, questionCapitals: number): Array<any> {
        
        const questions = [];
        const totalCountriesData = countries.length;

        for(let i = 0; i < questionCountries; i++) {

            const randomCountryIndex = Math.floor(Math.random() * totalCountriesData);
            const country = countries[randomCountryIndex];

            questions.push({
                label: country.translations.fr || country.name,
                answer: country.alpha2Code,
                type: GeoquizzQuestionType.WORLD
            });
        }

        for(let i = 0; i < questionFlags; i++) {

            const randomCountryIndex = Math.floor(Math.random() * totalCountriesData);
            const country = countries[randomCountryIndex];

            questions.push({
                label: 'Trouvez le nom du pays',
                flag: country.flags.svg,
                answer: country.translations.fr ||country.name,
                type: GeoquizzQuestionType.FLAG
            });
        }

        for(let i = 0; i < questionCapitals; i++) {

            const randomCountryIndex = Math.floor(Math.random() * totalCountriesData);
            const country = countries[randomCountryIndex];

            questions.push({
                label: 'Trouvez la capitale de ' + country.translations.fr || country.name,
                answer: country.capital,
                type: GeoquizzQuestionType.CAPITAL
            });
        }

        return questions;
    }
}