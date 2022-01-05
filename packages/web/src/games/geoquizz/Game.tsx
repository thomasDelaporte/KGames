import React, { useContext, useEffect, useState } from 'react';

import { GeoquizzQuestionType } from '@kgames/common';
import { Question, QuestionAudio, QuestionImage } from './questions';
import { GameContext } from '../../store/game';


export default function GeoquizzGame() {

    const { websocket, owner } = useContext<GameContext>(GameContext);

    const [question, setQuestion] = useState<{ question: any, type: GeoquizzQuestionType, number: number }>();
    const [timer, setTimer] = useState<number>(10);
    const [response, setResponse] = useState<string>('');

    useEffect(() => {

        websocket.addEventListener('message', (raw) => {

            const data = JSON.parse(raw.data);
            
            if(data.event === 'question') {
                
                const questionData = data;
                delete questionData.event;

                setQuestion(questionData);
            } else if(data.event  == 'questionretrieve') {
                
                setResponse(prevResponse => {
                    console.log('send response');
                    websocket.send(JSON.stringify({ event: 'response', response: prevResponse }));
                    return '';
                });
            } else if(data.event == 'timer') {
                setTimer(data.timer);
            }
        });
    }, []);

    if(!question)
        return <p>Loading question...</p>

    return (
        <div className="game">
            <span className="geoquizz__time" style={{ '--progress': ((10 - timer) * 10) + '%' } as any}>{timer}</span>

            { question.type === GeoquizzQuestionType.AUDIO ?
                (<QuestionAudio question={question} />)
            : question.type === GeoquizzQuestionType.IMAGE ? 
                (<QuestionImage question={question} />)
            : (<Question question={question} />) }

            <div className="geoquizz__answer">
                <span className="geoquizz__answer__label">Réponse {question.number}</span>
                <input type="text" className="input" placeholder="Réponse" value={response} onChange={(e) => setResponse(e.target.value)} />
            </div>

            { owner && 
                <button className="btn" onClick={() => websocket.send(JSON.stringify({ event: 'reset' }))}>Reset</button>
            }
        </div>
    )
}