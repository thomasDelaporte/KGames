import { v4 as uuidv4 } from 'uuid';
import React from 'react';

import './index.scss';

export const Game = () => {

    return (
        <div className="lobby__content geoquizz">
            <h2 className="lobby__content__title">Geoquizz</h2>
            <p className="lobby__content__desc">Testez votre niveau en géographie, placez des pays, trouvez le nom des drapeaux et des 
            capitales pour gagner le plus de points</p>

            <span className="geoquizz__time">10</span>

            <div className="game">
                <div className="geoquizz__question" data-question="1">
                    <h3>Quel grand personnage de l'antiquité a fondé la cité d'Alexandrie en Egypte ?</h3>
                </div>

                <label className="geoquizz__answer input-group label">Question 1<input type="text" className="input" placeholder="Réponse" /></label>
            </div>

            <button className="btn" onClick={() => alert('reset')}>Reset</button>
        </div>
    );
}

export const GameResultOrders = () => (
    <div className="lobby__content geoquizz">
        <h2 className="lobby__content__title">Geoquizz</h2>
        <p className="lobby__content__desc">Testez votre niveau en géographie, placez des pays, trouvez le nom des drapeaux et des 
        capitales pour gagner le plus de points</p>

        <div className="game">
            <div className="geoquizz__question" data-question="1">
                <h3>Quel grand personnage de l'antiquité a fondé la cité d'Alexandrie en Egypte ?</h3>
                <div className="geoquizz__question__answer">
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
                </div>
            </div>

            <div className="geoquizz__results">
                <div className="geoquizz__results__item" data-question="1">
                    <h3>DLP</h3>

                    <div className="geoquizz_results__orders geoquizz__orders">
                        <div className="geoquizz__orders__item geoquizz__orders__item--correct" data-index="1">
                            <img src="https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Swain_0.jpg" />
                        </div>
                        <div className="geoquizz__orders__item geoquizz__orders__item--wrong" data-index="2">
                            <img src="https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Seraphine_0.jpg" />
                        </div>
                        <div className="geoquizz__orders__item geoquizz__orders__item--wrong" data-index="3">
                            <img src="https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Kennen_0.jpg" />
                        </div>
                        <div className="geoquizz__orders__item geoquizz__orders__item--wrong" data-index="4">
                            <img src="https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Zyra_0.jpg" />
                        </div>
                    </div>

                    <label className="geoquizz__results__switch switch"><input type="checkbox"/><span className="switch__label" ></span></label> 
                </div>
            </div>
        </div>

        <button className="btn" onClick={() => setStep(0)}>Réponse suivante</button>
    </div>
)

export const GameResultSimple = () => (
    <div className="lobby__content geoquizz">
        <h2 className="lobby__content__title">Geoquizz</h2>
        <p className="lobby__content__desc">Testez votre niveau en géographie, placez des pays, trouvez le nom des drapeaux et des 
        capitales pour gagner le plus de points</p>

        <div className="geoquizz">
            

            <div className="game">
                <div className="geoquizz__question" data-question="1">
                    <h3>Quel grand personnage de l'antiquité a fondé la cité d'Alexandrie en Egypte ?</h3>
                </div>

                <div className="geoquizz__results">
                    <div className="geoquizz__results__item" data-question="1">
                        <h3>DLP</h3>

                        <div>Hello world</div>

                    <label className="geoquizz__results__switch switch">
                        <input type="checkbox" defaultChecked/>
                        <span className="switch__label" ></span>
                    </label> 
                </div>
            </div>

            <button className="btn">Réponse suivante</button>
        </div>
    </div>
)
