import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { GameResultSimple } from '@kgames/geoquizz';

import './index.scss';
import { useParams } from 'react-router';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

const GET_LOBBY = gql`
    query getLobby($id: String!) {
        getLobby(id: $id) {
            id
            owner {
                id
                username
            }
            mode
        }
    }
`;

type LobbyResponse = {
    getLobby: {
        id: string;
        owner: {
            id: string;
            username: string;
        };
        mode: number;
    };
};

export function LobbyPage() {

    const [hasJoin, setHasJoin] = useState(false);
    const [step, setStep] = useState(0);

    const { id } = useParams() as { id: string };

    const { loading, error, data } = useQuery<LobbyResponse, { id: string }>(
        GET_LOBBY,
        {
            variables: { id },
        }
    );

    useEffect(() => {

        if(!loading && !error && data && data.getLobby !== null) {

            const ws = new WebSocket( import.meta.env.WS ?? 'ws://localhost:4000' );
            const token = localStorage.getItem('token');

            ws.onopen = () => ws.send(JSON.stringify({ e: 'joinlobby', lobby: id, token }));

            ws.onmessage = function(e) {
                
                const data = JSON.parse(e.data);

                if( data.e === 'onjoinlobby' )
                    setHasJoin(true);
            }
        }
    }, [ loading, error, data])

    if (!hasJoin) return <p>Waiting to join the lobby...</p>;
    if (loading) return <p>Loading lobby</p>;
    if (data && data.getLobby === null) return <p>Lobby introuvable</p>;

    return (
        <div className="lobby">
            <h1 className="page-title">
                {step === 3 ? 'Game' : 'Lobby'}. Owner {data?.getLobby.owner.username}
            </h1>
            <AnimatePresence>
                {step === 0 ? (
                    <LobbyPlayers setStep={setStep} />
                ) : step === 1 ? (
                    <LobbyGames setStep={setStep} />
                ) : step === 2 ? (
                    <LobbyConfiguration setStep={setStep} />
                ) : (
                    <GameResultSimple setStep={setStep} />
                )}
            </AnimatePresence>
        </div>
    );
}

export const LobbyPlayers = ({ setStep }) => {
    const [showCopy, setShowCopy] = useState(false);

    useEffect(() => {
        console.log(showCopy);
        if (showCopy === false) return;

        navigator.clipboard.writeText(window.location.href);
        setTimeout(() => setShowCopy(false), 1000);
    }, [showCopy]);

    return (
        <motion.div
            key={0}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 1, x: 50 }}
            className="lobby__content"
        >
            <h2 className="lobby__content__title">Inviter vos amis</h2>

            <div className="lobby__players players">
                <div className="players__item">
                    <img
                        className="players__item__thumbnail"
                        src="https://static.u.gg/assets/lol/riot_static/11.15.1/img/profileicon/4760.png"
                    />
                    <h2>DLP</h2>
                </div>

                <div className="players__item">
                    <img
                        className="players__item__thumbnail"
                        src="https://static.u.gg/assets/lol/riot_static/11.15.1/img/profileicon/4750.png"
                    />
                    <h2>Fightek</h2>
                </div>

                <div className="players__item">
                    <img
                        className="players__item__thumbnail"
                        src="https://static.u.gg/assets/lol/riot_static/11.15.1/img/profileicon/4730.png"
                    />
                    <h2>Fasyse</h2>
                </div>

                <button
                    className="players__item players__item--empty"
                    onClick={() => setShowCopy(true)}
                >
                    <motion.span
                        style={{ x: '-50%' }}
                        initial={{ opacity: 0 }}
                        animate={{
                            y: showCopy ? '-1.75rem' : '0rem',
                            opacity: showCopy ? 1 : 0,
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 150,
                            delay: 0.1,
                        }}
                        className="players__item--empty__copy"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M18 6v-6h-18v18h6v6h18v-18h-6zm-16 10v-14h14v4h-10v10h-4z"
                                fill="#ffffff"
                            />
                        </svg>
                        Vous avez copié le lien
                    </motion.span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <path d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm11.122 12.065c-.073.301-.122.611-.122.935 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-1.165 0-2.204.506-2.935 1.301l-5.488-2.927c-.23.636-.549 1.229-.943 1.764l5.488 2.927zm7.878-15.065c0-2.209-1.791-4-4-4s-4 1.791-4 4c0 .324.049.634.122.935l-5.488 2.927c.395.535.713 1.127.943 1.764l5.488-2.927c.731.795 1.77 1.301 2.935 1.301 2.209 0 4-1.791 4-4z" />
                    </svg>
                    Inviter vos amis
                </button>
            </div>

            <button className="btn" onClick={() => setStep(1)}>
                Choissisez le jeu
            </button>
        </motion.div>
    );
};

export const LobbyGames = ({ setStep }) => {
    const [selectedGame, setSelectedGame] = useState(3);

    return (
        <motion.div
            key={1}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="lobby__content"
        >
            <h2 className="lobby__content__title">Selectionner les jeux</h2>

            <div className="lobby__games games">
                <div className={`games__item games__item--disabled`}>
                    <img
                        className="games__item__thumbnail"
                        src="https://kgames.fr/games/icons/undercover.jpg"
                    />
                    <div className="games__item__content">
                        <h2>Imposteur</h2>
                        <p>
                            Trouvez qui est l'imposteur! À moins que ce soit
                            vous ?
                        </p>
                    </div>
                </div>

                <div className={`games__item  games__item--disabled`}>
                    <img
                        className="games__item__thumbnail"
                        src="https://kgames.fr/games/icons/spyfall.jpg"
                    />
                    <div className="games__item__content">
                        <h2>Spyfall</h2>
                        <p>Débusquez l'espion ou trouvez le lieu!</p>
                    </div>
                </div>

                <div className={`games__item  games__item--disabled`}>
                    <img
                        className="games__item__thumbnail"
                        src="https://kgames.fr/games/icons/geoquizz.jpg"
                    />
                    <div className="games__item__content">
                        <h2>Géoquizz</h2>
                        <p>
                            Testez votre niveau en géographie, placez des pays,
                            trouvez le nom des drapeaux et des capitales pour
                            gagner le plus de points
                        </p>
                    </div>
                </div>

                <div
                    className={`games__item ${
                        selectedGame == 3 ? 'games__item--active' : null
                    }`}
                    onClick={() => setSelectedGame(3)}
                >
                    <img
                        className="games__item__thumbnail"
                        src="https://kgames.fr/games/icons/kculture.jpg"
                    />
                    <div className="games__item__content">
                        <h2>Kculture</h2>
                        <p>Testez votre culture générale entre amis !</p>
                    </div>
                </div>

                <div className={`games__item  games__item--disabled`}>
                    <img
                        className="games__item__thumbnail"
                        src="https://kgames.fr/games/icons/infiltre.png"
                    />
                    <div className="games__item__content">
                        <h2>L'infiltré</h2>
                        <p>
                            Trouvez le mot caché, mais trouvez aussi l'infiltré
                        </p>
                    </div>
                </div>
            </div>

            <button className="btn" onClick={() => selectedGame && setStep(2)}>
                Configurer le jeu
            </button>
        </motion.div>
    );
};

export const LobbyConfiguration = ({ setStep }) => (
    <motion.div
        key={2}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        className="lobby__content"
    >
        <h2 className="lobby__content__title">Configurer votre partie</h2>

        <div className="lobby__configuration">
            <label className="input-group label">
                Thême
                <input type="text" className="input" />
            </label>
            <label className="input-group label">
                Autre option
                <input type="text" className="input" />
            </label>
            <label className="input-group label">
                Une option select
                <select className="input input--select">
                    <option>Oui</option>
                </select>
            </label>
        </div>

        <button className="btn" onClick={() => setStep(3)}>
            Démarrer la partie
        </button>
    </motion.div>
);
