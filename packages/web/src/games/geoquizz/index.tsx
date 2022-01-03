import { motion, useAnimation } from 'framer-motion';
import React, { useEffect, useState } from 'react';

import { GeoquizzQuestionType } from '@kgames/common';

import './index.scss';
import { Question } from './components/Question';
import { QuestionAudio } from './components/QuestionAudio';
import { AnswerBac } from './components/AnswerBac';
import { AnswerOrder } from './components/AnswerOrder';
import { QuestionImage } from './components/QuestionImage';

let interval: number;

export const Game = ({ websocket }: { websocket: WebSocket }) => {

    const controls = useAnimation();

    const [question, setQuestion] = useState<{ question: any, type: GeoquizzQuestionType, number: number }>();
    const [timer, setTimer] = useState(10);

    useEffect(() => {

        websocket.onmessage = (raw: MessageEvent<any>) => {

            const data = JSON.parse(raw.data);
            
            if(data.event === 'question') {
                
                const questionData = data;
                delete questionData.event;

                console.log(questionData);

                clearInterval(interval);

                setQuestion(questionData);
                setTimer(10);

                interval = setInterval(() => {
                    setTimer(prev => {

                        if(prev <= 1) {
                            clearInterval(interval);
                        }
                            
                        return prev - 1;
                    });
                }, 1000)
            }
        }
    }, []);

    return (
        <div className="lobby__content geoquizz">
            <h2 className="lobby__content__title">Geoquizz</h2>
            <p className="lobby__content__desc">Testez votre niveau en géographie, placez des pays, trouvez le nom des drapeaux et des 
            capitales pour gagner le plus de points</p>

            <span className="geoquizz__time" style={{ '--progress': ((10 - timer) * 10) + '%' } as any}>{timer}</span>

            <div className="game">
                { question && question.type === GeoquizzQuestionType.AUDIO ?
                    (<QuestionAudio question={question} />)
                : question && question.type === GeoquizzQuestionType.IMAGE ? 
                    (<QuestionImage question={question} />)
                : question ?
                    (<Question question={question} />)
                : null }
                
                <div className="geoquizz__answer">
                    <span className="geoquizz__answer__label">Réponse {question && question.number}</span>
                </div>

                { question && question.type === GeoquizzQuestionType.BAC ?
                    (<AnswerBac />)
                : question && question.type === GeoquizzQuestionType.ORDER ?
                    (<AnswerOrder question={question} />)
                : question ?
                    (<input type="text" className="input" placeholder="Réponse" />)
                : null }
            </div>

            <button className="btn" onClick={() => websocket.send(JSON.stringify({ event: 'reset' }))}>Reset</button>
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

        <button className="btn">Réponse suivante</button>
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
    </div>
)
function GameContext(GameContext: any): { websocket: any; } {
    throw new Error('Function not implemented.');
}

