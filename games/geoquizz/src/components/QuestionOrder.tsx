import React from 'react';
import { Question } from './Question';

export const QuestionOrder = (props) => {
    <Question {...props}>
        <div className="geoquizz__orders">
            <div className="geoquizz__orders__item" data-index="1">
                <img src="https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Swain_0.jpg" />
            </div>

            <div className="geoquizz__orders__item" data-index="2">
                <img src="https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Seraphine_0.jpg" />
            </div>

            <div className="geoquizz__orders__item" data-index="3">
                <img src="https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Kennen_0.jpg" />
            </div>

            <div className="geoquizz__orders__item" data-index="4">
                <img src="https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Zyra_0.jpg" />
            </div>
        </div>
    </Question>
}