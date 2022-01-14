import { GeoquizzQuestionType } from '@kgames/common';
import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../store';
import { AnswerWorld } from './answers/World/AnswerWorld';
import { QuestionFlag } from './questions/Flag/QuestionFlag';

export default function Geoquizz() {

    const { websocket } = useContext<GameContext>(GameContext);
    
    const [ timer, setTimer ] = useState<number>(10);
    const [ question, setQuestion ] = useState<any>();
    const [ answer, setAnswer ] = useState<string>('');

    useEffect(() => {

        websocket.addEventListener('message', (raw) => {

            const data = JSON.parse(raw.data);

        });
    }, [])

    if(!question)
        return <p>Loading question...</p>

    return (
        <div className="room__content geoquizz">
            <h2 className="page-title__subtitle">Geoquizz</h2>

            { timer ? (
                <span className="kculture__time">{String(timer).padStart(2, '0')}</span>
            ): null }

            <div className="geoquizz__question">
                <span className="geoquizz__question__label">{question.label}</span>
                <small className="geoquizz__question__desc-type">Description de la partie en cour</small>

                { question.type === GeoquizzQuestionType.FLAG ?
                    <QuestionFlag />
                : null }
            </div>

            { question.type === GeoquizzQuestionType.WORLD ?
                <AnswerWorld setAnswer={setAnswer} answer={answer} />    
            : 
                <input type="text" className="input" placeholder="Réponse" value={answer} onChange={(e) => setAnswer(e.target.value)} />            
            }
        </div>
    )
}