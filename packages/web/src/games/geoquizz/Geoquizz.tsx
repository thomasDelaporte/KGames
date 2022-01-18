import { GeoquizzQuestionType } from '@kgames/common';
import React, { useContext, useEffect, useState } from 'react';
import { LobbyConfiguration } from '../../components/Lobby';
import { GameContext } from '../../store';
import { AnswerWorld } from './answers/World/AnswerWorld';
import { QuestionFlag } from './questions/Flag/QuestionFlag';

export default function Geoquizz() {

    const { websocket, id, owner, step, setStep, configuration } = useContext<GameContext>(GameContext);
    
    const [ timer, setTimer ] = useState<number>(10);
    const [ question, setQuestion ] = useState<any>();
    const [ answer, setAnswer ] = useState<string>('');

    useEffect(() => {

        websocket.addEventListener('message', (raw) => {

            const data = JSON.parse(raw.data);

            if(data.event === 'question') {
                setQuestion(data.question);
                setAnswer('');
            } else if(data.event === 'timer') {
                setTimer(data.time);
            } else if(data.event === 'resultquestion') {
                setQuestion(data.question);
                setAnswer(data.answer);
                setStep(5);
            }
        });
    }, []);

    useEffect(() => {

        if( step !== 5 && answer && answer != '' ){
            websocket.send(JSON.stringify({ event: 'answer', answer }));
        }
    }, [answer]);

    if(!question)
        return <p>Loading question...</p>

    return (
        <div className="room__content geoquizz">
            <h2 className="page-title__subtitle">Geoquizz</h2>

            { timer ? (
                <span className="kculture__time" style={{ '--progress': `${(configuration.timesPerQuestion - timer) * 100 / configuration.timesPerQuestion}%`} as any}>{String(timer).padStart(2, '0')}</span>
            ): null }

            <div className="question" data-question={question.number}>
                <span className="question__label">{question.label}</span>

                { question.type === GeoquizzQuestionType.FLAG ?
                    <QuestionFlag room={id} number={question.number} />
                : null }

                { step === 5 && question.answer && question.type !== GeoquizzQuestionType.WORLD &&
                    <div className="question__answer">{question.answer }</div>
                }
            </div>

            <div className="kculture__answer">
                <span className="kculture__answer__label">Réponse {question.number}</span>

                { step === 5 &&
                    <h3 className="kculture__answer__username">{question.username}</h3>
                }

                { question.type === GeoquizzQuestionType.WORLD ?
                    <AnswerWorld question={question} setAnswer={setAnswer} answer={answer} disabled={step === 5} />
                : 
                    <input type="text" className="input" placeholder="Réponse" value={answer} onChange={(e) => setAnswer(e.target.value)} disabled={step === 5} />            
                }
            </div>

           
            { step === 5 && owner &&
                <button className="btn" onClick={() => websocket.send(JSON.stringify({ event: 'nextquestion' }))}>Réponse suivante</button>
            }
        </div>
    )
}