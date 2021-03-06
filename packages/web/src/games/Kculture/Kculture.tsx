import React, { useContext, useEffect, useState } from 'react';

import { KcultureQuestionType } from '@kgames/common';
import { GameContext } from '../../store';
import { QuestionAudio, QuestionImage } from './questions';
import { AnswerMarker, AnswerOrder, AnswerScattergory } from './answers';

import './Kculture.style.scss';

export const Kculture = () => {

    const { websocket, step, owner, configuration } = useContext<GameContext>(GameContext);
    
    const [ question, setQuestion ] = useState<any>();
    const [ answer, setAnswer ] = useState<any>();
    const [ timer, setTimer ] = useState<number>();
    const [ valid, setValid ] = useState(false);

    useEffect(() => {

        websocket.addEventListener('message', (raw) => {

            const data = JSON.parse(raw.data);
            
            if(data.event === 'updatestep') {
                if(data.step === 5) {
                    setQuestion(data.question);
                    setAnswer(data.answer);
                }
            } else if(data.event === 'question') {

                if(data.question.type === KcultureQuestionType.ORDER) {
                    setAnswer(data.question.items);
                } else {
                    setAnswer('');
                }

                setQuestion(data.question);
            } else if(data.event  == 'questionretrieve') {
                
                setAnswer((prevResponse: any) => {
                    websocket.send(JSON.stringify({ event: 'response', response: prevResponse }));
                    return '';
                });
            } else if(data.event == 'timer') {
                setTimer(data.time);
            } else if(data.event === 'togglevalidity') {
                setValid(data.valid);
            }
        });
    }, []);

    const validQuestion = () => {
        setValid(() => {
            websocket.send(JSON.stringify({ event: 'validquestion' }));
            return false;
        });
    }

    const toggleValidity = (e: React.ChangeEvent<HTMLInputElement>) => {
        websocket.send(JSON.stringify({ event: 'togglevalidity', valid: e.target.checked }))
    }

    if(!question)
        return <p>Loading question...</p>

    return (
        <div className="room__content kculture">
            <h2 className="page-title__subtitle">Kculture</h2>

            { timer ? (
                <span className="kculture__time" style={{ '--progress': `${(configuration.time - timer) * 100 / configuration.time}%`} as any}>{String(timer).padStart(2, '0')}</span>
            ): null }

            <div className="kculture__step">
                <div className="kculture__step__progress" style={{ width: `${question.number * 100 / configuration.questions}%` }}></div>
            </div>

            <div className="question" data-question={question.number}>
                <h3>{question.question}</h3>

                { question.type === KcultureQuestionType.AUDIO ?
                    (<QuestionAudio question={question} autoPlay={true} />)
                : question.type === KcultureQuestionType.IMAGE ? 
                    (<QuestionImage question={question} />)
                : null }

                { step === 5 && question.answer &&
                    <div className="question__answer">
                        { question.type === KcultureQuestionType.ORDER ?
                            <AnswerOrder response={question.answer} disabled={true} />
                        : question.answer }
                    </div>
                }
            </div>

            <div className="kculture__answer">
                <span className="kculture__answer__label">R??ponse {question.number}</span>

                { step === 5 &&
                    <h3 className="kculture__answer__username">{question.username}</h3>
                }

                { step === 5 &&
                    <label className="kculture__results__switch switch">
                        <input type="checkbox" checked={valid} { ...owner && { onChange: toggleValidity } }  />
                        <span className="switch__label" ></span>
                    </label>
                }

                { question.type === KcultureQuestionType.ORDER ?
                    <AnswerOrder question={question} response={answer} setResponse={setAnswer} disabled={step === 5} />
                : question.type === 5 ?
                    <AnswerMarker question={question} response={answer} setResponse={setAnswer} disabled={step === 5} />
                : question.type === KcultureQuestionType.BAC ?
                    <AnswerScattergory response={answer} setResponse={setAnswer} disabled={step === 5} />
                :
                    <input type="text" className="input" placeholder="R??ponse" value={answer} onChange={(e) => setAnswer(e.target.value)} disabled={step === 5} />            
                }
            </div>

            { step === 5 && owner &&
                <button className="btn" onClick={validQuestion}>R??ponse suivante</button>
            }
        </div>
    );
}