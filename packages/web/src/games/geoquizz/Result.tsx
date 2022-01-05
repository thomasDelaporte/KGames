import React, { ChangeEvent, SyntheticEvent, useContext, useEffect, useState } from 'react';
import { GameContext } from '../../store/game';

export default function ResultQuestion({ question, answer}: any) {

    const { owner, websocket } = useContext<GameContext>(GameContext);
    const [ valid, setValid ] = useState(false);

    useEffect(() => {

        websocket.addEventListener('message', (raw) => {

            const data = JSON.parse(raw.data);

            if(data.event === 'togglevalidity') {
                setValid(data.valid);
            }
        });
    }, []);

    useEffect(() => {
        setValid(false);
    }, [question, answer]);

    const validQuestion = () => {
        websocket.send(JSON.stringify({ event: 'validquestion' }));
    }

    const toggleValidity = (e: React.ChangeEvent<HTMLInputElement>) => {
        websocket.send(JSON.stringify({ event: 'togglevalidity', valid: e.target.checked }))
    }

    if(!question || !answer)
        return <p>Loading result...</p>
    
    return (
        <div className="result">
            <div className="geoquizz__question" data-question={question.number}>
                <h3>{question.question}</h3>
            </div>

            <div className="geoquizz__results">
                <div className="geoquizz__results__item" data-question="1">
                    <h3>{answer.username}</h3>
                    <div>{answer.answer}</div>

                    <label className="geoquizz__results__switch switch">
                        <input type="checkbox" checked={valid} { ...owner && { onChange: toggleValidity } }  />
                        <span className="switch__label" ></span>
                    </label> 
                </div>
            </div>

            {owner &&
                <button className="btn" onClick={validQuestion}>Réponse suivante</button>
            }
        </div>
    )
}