import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { GameContext, SessionContext } from '../../store';

import './Undercover.style.scss';

export const Undercover = () => {

    const { user } = useContext(SessionContext);
    const { websocket, configuration, owner, players } = useContext<GameContext>(GameContext);

    const [ timer, setTimer ] = useState<number>(configuration.timesPerRound);
    const [ round, setRound ] = useState<any>();
    const [ turn, setTurn ] = useState<string>('');
    const [ words, setWords ] = useState<any>({});

    const [ word, setWord ] = useState<string>();

    const onEvent = (raw: MessageEvent) => {

        const data = JSON.parse(raw.data);

        if(data.event === 'round') {
            setRound(data.round);
            setWords({});
        } else if(data.event === 'timer') {
            setTimer(data.time);
        } else if(data.event === 'turn') {
            setTurn(data.turn);
        } else if(data.event === 'words') {
            setWords(data.words);
        }
    }

    const submitWord = (e: FormEvent) => {

        e.preventDefault();

        setWord(prevWord => {
            websocket.send(JSON.stringify({ event: 'word', word: prevWord })); return '';
        })
    }

    useEffect(() => {
        websocket.addEventListener('message', onEvent);
        return () => websocket.removeEventListener('message', onEvent);
    }, []);

    if(!round)
        return <p>Loading round data...</p>

    return (
        <div className="room__content undercover">
            <h2 className="page-title__subtitle">Undercover</h2>

            { timer ? (
                <span className="kculture__time" style={{ '--progress': `${(configuration.timesPerRound - timer) * 100 / configuration.timesPerRound}%`} as any}>{String(timer).padStart(2, '0')}</span>
            ): null }

            <div className="question" data-question={round.number}>
                <span className="question__label">{round.word}</span>
            </div>

            <div className="undercover__players">
                {players.map((player: any) => (
                    <div className="undercover__players__item" key={player.id}>
                        <img className="undercover__players__item__picture" src={player.picture} />
                        <span className="undercover__players__item__name">{player.username}</span>

                        { words[player.id] && 
                            <ul className="undercover__words">
                                {words[player.id].map((word: string, k: number) => (
                                    <li className="undercover__words__item" key={k}>{word}</li>
                                ))}
                            </ul>
                        }
                    </div>
                ))}
            </div>

            { turn === user.me.id &&
                <form className="undercover__word" onSubmit={submitWord}>
                    <input className="input" placeholder="Votre mot" value={word} onChange={e => setWord(e.target.value)} />
                    <button className="btn undercover__word__btn">Envoyer</button>
                </form>
            }

            { owner &&
                <button className="btn">Passer au vote</button>
            }
        </div>
    )
}