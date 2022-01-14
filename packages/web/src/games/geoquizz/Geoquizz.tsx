import React, { useState } from 'react';
import { AnswerWorld } from './answers/World/AnswerWorld';

export default function Geoquizz() {

    const [ timer, setTimer ] = useState<number>(10);
    const [ answer, setAnswer ] = useState<string>('');

    return (
        <div className="room__content geoquizz">
            <h2 className="page-title__subtitle">Geoquizz</h2>

            { timer ? (
                <span className="kculture__time">{String(timer).padStart(2, '0')}</span>
            ): null }

            <div className="geoquizz__question">
                <span className="geoquizz__question__label">Placez le pays</span>
            </div>

            <input type="text" className="input" placeholder="Réponse" value={answer} onChange={(e) => setAnswer(e.target.value)} />            
        </div>
    )
}