import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../../store/game';

import GeoquizzGame from './Game';
import ResultQuestion from './Result';

import './index.scss';
import Score from './Score';

export default function Geoquizz() {

    const { websocket, step } = useContext<{ websocket: WebSocket, step: number }>(GameContext);
    
    const [ question, setQuestion ] = useState<any>();
    const [ answer, setAnswer ] = useState<any>();
    const [ scores, setScores ] = useState({});

    useEffect(() => {

        websocket.addEventListener('message', (raw) => {

            const data = JSON.parse(raw.data);
            
            if(data.event === 'updatestep') {
                console.log(data);

                if(data.step === 5) {
                    setQuestion(data.question);
                    setAnswer(data.answer);
                } else if(data.step === 6) {
                    setScores(data.scores);
                }
            }
        });
    }, []);

    return (
        <div className="lobby__content geoquizz">
            <h2 className="lobby__content__title">Geoquizz</h2>
            <p className="lobby__content__desc">Testez votre niveau en géographie, placez des pays, trouvez le nom des drapeaux et des 
                capitales pour gagner le plus de points</p>
            
            { step === 4 ?
                <GeoquizzGame />
            : step === 5 ?
                <ResultQuestion question={question} answer={answer} />
            : step === 6 ?
                <Score scores={scores} />
            : null}
        </div>
    );
}