import React, { useContext, useEffect, useState } from 'react';

import { GeoquizzQuestionType } from '@kgames/common';
import { Question, QuestionAudio, QuestionImage } from './questions';
import { GameContext } from '../../store/game';
import { AnswerOrder } from './answers/AnswerOrder';
import { AnswerPlaceOnImage } from './answers/AnswerPlaceOnImage';
import { AnswerBac } from './answers/AnswerBac';

export default function GeoquizzGame() {

    const { websocket, owner } = useContext<GameContext>(GameContext);

    const [question, setQuestion] = useState<{ question: any, type: GeoquizzQuestionType, number: number }>();
    const [timer, setTimer] = useState<number>();
    const [response, setResponse] = useState<any>('');

    useEffect(() => {

        websocket.addEventListener('message', (raw) => {

            const data = JSON.parse(raw.data);
            
            if(data.event === 'question') {

                if(data.question.type === GeoquizzQuestionType.ORDER) {
                    setResponse(data.question.items);
                } else {
                    setResponse('');
                }

                setQuestion(data.question);
            } else if(data.event  == 'questionretrieve') {
                
                setResponse((prevResponse: any) => {
                    console.log('send response', prevResponse);
                    websocket.send(JSON.stringify({ event: 'response', response: prevResponse }));
                    return '';
                });
            } else if(data.event == 'timer') {
                setTimer(data.time);
            }
        });
    }, []);

    if(!question)
        return <p>Loading question...</p>

    return (
        <div className="game">

            { timer ? (
                <span className="geoquizz__time">{String(timer).padStart(2, '0')}</span>
            ): null }

            { question.type === GeoquizzQuestionType.AUDIO ?
                (<QuestionAudio question={question} autoPlay={true} />)
            : question.type === GeoquizzQuestionType.IMAGE ? 
                (<QuestionImage question={question} />)
            : (<Question question={question} />) }

            <div className="geoquizz__answer">
                <span className="geoquizz__answer__label">Réponse {question.number}</span>

                { question.type === GeoquizzQuestionType.ORDER ?
                    <AnswerOrder question={question} response={response} setResponse={setResponse} />
                : question.type === 5 ?
                    <AnswerPlaceOnImage question={question} response={response} setResponse={setResponse} />
                : question.type === GeoquizzQuestionType.BAC ?
                    <AnswerBac response={response} setResponse={setResponse} />
                :
                    <input type="text" className="input" placeholder="Réponse" value={response} onChange={(e) => setResponse(e.target.value)} />            
                }
            </div>
        </div>
    )
}