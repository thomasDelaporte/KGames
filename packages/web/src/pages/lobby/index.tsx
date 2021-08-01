import React, { useState } from 'react';

import './index.scss';

export default function LobbyPage() {
    const [step, setStep] = useState(0);

    return (
        <div className="lobby">
            <h1 className="page-title">{ step === 3 ? 'Game' : 'Lobby'}.</h1>
            { 
                step === 0 ? <LobbyPlayers setStep={setStep} /> :
                step === 1 ? <LobbyGames setStep={setStep} /> : 
                step === 2 ? <LobbyConfiguration setStep={setStep} /> : <GameAudio setStep={setStep} />
            }
        </div>
    );
}

export const LobbyPlayers = ({ setStep }) => (
    <div className="lobby__content">
        <h2 className="lobby__content__title">Inviter vos amis</h2>

        <div className="lobby__players players">
            <div className="players__item">
                <img className="players__item__thumbnail" src="https://static.u.gg/assets/lol/riot_static/11.15.1/img/profileicon/4760.png" />
                <h2>DLP</h2>
            </div>

            <div className="players__item">
                <img className="players__item__thumbnail" src="https://static.u.gg/assets/lol/riot_static/11.15.1/img/profileicon/4750.png" />
                <h2>Fightek</h2>
            </div>

            <div className="players__item">
                <img className="players__item__thumbnail" src="https://static.u.gg/assets/lol/riot_static/11.15.1/img/profileicon/4730.png" />
                <h2>Fasyse</h2>
            </div>

            <button className="players__item players__item--empty">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 7c2.761 0 5 2.239 5 5s-2.239 5-5 5-5-2.239-5-5 2.239-5 5-5zm11.122 12.065c-.073.301-.122.611-.122.935 0 2.209 1.791 4 4 4s4-1.791 4-4-1.791-4-4-4c-1.165 0-2.204.506-2.935 1.301l-5.488-2.927c-.23.636-.549 1.229-.943 1.764l5.488 2.927zm7.878-15.065c0-2.209-1.791-4-4-4s-4 1.791-4 4c0 .324.049.634.122.935l-5.488 2.927c.395.535.713 1.127.943 1.764l5.488-2.927c.731.795 1.77 1.301 2.935 1.301 2.209 0 4-1.791 4-4z"/></svg>Inviter vos amis
            </button>
        </div>

        <button className="btn" onClick={() => setStep(1)}>Choissisez le jeu</button>
    </div>
)

export const LobbyGames = ({ setStep }) => {
    const [selectedGame, setSelectedGame] = useState();

    return (
        <div className="lobby__content">
            <h2 className="lobby__content__title">Selectionner les jeux</h2>

            <div className="lobby__games games">

                <div className={`games__item ${selectedGame == 0 ? 'games__item--active' : null}`} onClick={() => setSelectedGame(0)}>
                    <img className="games__item__thumbnail" src="https://kgames.fr/games/icons/undercover.jpg" />
                    <div className="games__item__content">
                        <h2>Imposteur</h2>
                        <p>Trouvez qui est l'imposteur! À moins que ce soit vous ?</p>
                    </div>
                </div>

                <div className={`games__item ${selectedGame == 1 ? 'games__item--active' : null}`} onClick={() => setSelectedGame(1)}>
                    <img className="games__item__thumbnail" src="https://kgames.fr/games/icons/spyfall.jpg" />
                    <div className="games__item__content">
                        <h2>Spyfall</h2>
                        <p>Débusquez l'espion ou trouvez le lieu!</p>
                    </div>
                </div>

                <div className={`games__item ${selectedGame == 2 ? 'games__item--active' : null}`} onClick={() => setSelectedGame(2)}>
                    <img className="games__item__thumbnail" src="https://kgames.fr/games/icons/geoquizz.jpg" />
                    <div className="games__item__content">
                        <h2>Géoquizz</h2>
                        <p>Testez votre niveau en géographie, placez des pays, trouvez le nom des drapeaux et des capitales pour gagner le plus de points</p>
                    </div>
                </div>

                <div className={`games__item ${selectedGame == 3 ? 'games__item--active' : null}`} onClick={() => setSelectedGame(3)}>
                    <img className="games__item__thumbnail" src="https://kgames.fr/games/icons/kculture.jpg" />
                    <div className="games__item__content">
                        <h2>Kculture</h2>
                        <p>Testez votre culture générale entre amis !</p>
                    </div>
                </div>

                <div className={`games__item ${selectedGame == 4 ? 'games__item--active' : null}`} onClick={() => setSelectedGame(4)}>
                    <img className="games__item__thumbnail" src="https://kgames.fr/games/icons/infiltre.png" />
                    <div className="games__item__content">
                        <h2>L'infiltré</h2>
                        <p>Trouvez le mot caché, mais trouvez aussi l'infiltré</p>
                    </div>
                </div>
            </div>

            <button className="btn" onClick={() => setStep(2)}>Configurer le jeu</button>
        </div>
    )
}

export const LobbyConfiguration = ({ setStep }) => (
    <div className="lobby__content">
        <h2 className="lobby__content__title">Configurer votre partie</h2>

        <div className="lobby__configuration">
            <label className="input-group label">Thême<input type="text" className="input" /></label>
            <label className="input-group label">Autre option<input type="text" className="input" /></label>
            <label className="input-group label">Une option select
                <select className="input input--select">
                    <option>Oui</option>
                </select>
            </label>
        </div>

        <button className="btn" onClick={() => setStep(3)}>Démarrer la partie</button>
    </div>
)

export const Game = ({ setStep }) => (
    <div className="lobby__content geoquizz">
        <h2 className="lobby__content__title">Geoquizz</h2>
        <p className="lobby__content__desc">Testez votre niveau en géographie, placez des pays, trouvez le nom des drapeaux et des 
        capitales pour gagner le plus de points</p>

        <span className="geoquizz__time">10</span>

        <div className="game">
            <div className="geoquizz__question">
                <h3>Quel grand personnage de l'antiquité a fondé la cité d'Alexandrie en Egypte ?</h3>
                <span className="geoquizz__question__number">1</span>
            </div>

            <label className="geoquizz__answer input-group label">Question 1<input type="text" className="input" placeholder="Réponse" /></label>
        </div>

        <button className="btn" onClick={() => setStep(0)}>Reset</button>
    </div>
)

export const GameImage = ({ setStep }) => (
    <div className="lobby__content geoquizz">
        <h2 className="lobby__content__title">Geoquizz</h2>
        <p className="lobby__content__desc">Testez votre niveau en géographie, placez des pays, trouvez le nom des drapeaux et des 
        capitales pour gagner le plus de points</p>

        <span className="geoquizz__time">10</span>

        <div className="game">
            <div className="geoquizz__question" data-question="1">
                <h3>Quel grand personnage de l'antiquité a fondé la cité d'Alexandrie en Egypte ?</h3>
                <img className="geoquizz__question__image" src="https://cdna.artstation.com/p/assets/images/images/036/415/176/large/jun-seong-park-juns-league-of-legends-orchestra-art-freljord.jpg?1617631996" />
            </div>

            <label className="geoquizz__answer input-group label">Votre réponse<input type="text" className="input" placeholder="Réponse" /></label>
        </div>

        <button className="btn" onClick={() => setStep(0)}>Reset</button>
    </div>
)

export const GameOrder = ({ setStep }) => (
    <div className="lobby__content geoquizz">
        <h2 className="lobby__content__title">Geoquizz</h2>
        <p className="lobby__content__desc">Testez votre niveau en géographie, placez des pays, trouvez le nom des drapeaux et des 
        capitales pour gagner le plus de points</p>

        <span className="geoquizz__time">10</span>

        <div className="game">
            <div className="geoquizz__question" data-question="1">
                <h3>Classez ces animaux du plus rapide au plus lent</h3>

                <div className="geoquizz__orders">
                    <div className="geoquizz__orders__item" data-index="1">
                        <img src="https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Swain_0.jpg" />
                    </div>
                    <div className="geoquizz__orders__item" data-index="2">
                        <img src="https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Seraphine_0.jpg" />
                    </div>
                    <div className="geoquizz__orders__item" data-index="3">
                        <img src="https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Kennen_0.jpg" />
                    </div>
                    <div className="geoquizz__orders__item" data-index="4">
                        <img src="https://static.u.gg/assets/lol/riot_static/11.15.1/img/splash/Zyra_0.jpg" />
                    </div>
                </div>
            </div>
        </div>

        <button className="btn" onClick={() => setStep(0)}>Reset</button>
    </div>
)

export const GamePetitBac = ({ setStep }) => (
    <div className="lobby__content geoquizz">
        <h2 className="lobby__content__title">Geoquizz</h2>
        <p className="lobby__content__desc">Testez votre niveau en géographie, placez des pays, trouvez le nom des drapeaux et des 
        capitales pour gagner le plus de points</p>

        <span className="geoquizz__time">10</span>

        <div className="game">
            <div className="geoquizz__question" data-question="1">
                <h3>Petit Bac: A</h3>
                
                <div className="geoquizz__petitbac">
                    <label className="input-group label">Animal<input className="input input--color input--small" type="text" /></label>
                    <label className="input-group label">Célébrité (nom de f.)<input className="input input--color input--small" type="text" /></label>
                    <label className="input-group label">Pays<input className="input input--color input--small" type="text" /></label>
                    <label className="input-group label">Métier<input className="input input--color input--small" type="text" /></label>
                    <label className="input-group label">Fruit & légume<input className="input input--color input--small" type="text" /></label>
                    <label className="input-group label">Objet<input className="input input--color input--small" type="text" /></label>
                    <label className="input-group label">Sport<input className="input input--color input--small" type="text" /></label>
                </div>
            </div>
        </div>

        <button className="btn" onClick={() => setStep(0)}>Reset</button>
    </div>
)

export const GameAudio = ({ setStep }) => (
    <div className="lobby__content geoquizz">
        <h2 className="lobby__content__title">Geoquizz</h2>
        <p className="lobby__content__desc">Testez votre niveau en géographie, placez des pays, trouvez le nom des drapeaux et des 
        capitales pour gagner le plus de points</p>

        <span className="geoquizz__time">10</span>

        <div className="game">
            <div className="geoquizz__question" data-question="1">
                <h3>Quel est cet animal ?</h3>
                    <audio className="geoquizz__audio" controls>
                        <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg" />
                        <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
            </div>
        </div>

        <button className="btn" onClick={() => setStep(0)}>Reset</button>
    </div>
)