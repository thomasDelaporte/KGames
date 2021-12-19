import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const LobbyGames = ({ setStep }: any) => {

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
                    <img className="games__item__thumbnail" src="https://kgames.fr/games/icons/undercover.jpg" />
                    <div className="games__item__content">
                        <h2>Imposteur</h2>
                        <p>Trouvez qui est l'imposteur! À moins que ce soit vous ?</p>
                    </div>
                </div>

                <div className={`games__item  games__item--disabled`}>
                    <img className="games__item__thumbnail" src="https://kgames.fr/games/icons/spyfall.jpg" />
                    <div className="games__item__content">
                        <h2>Spyfall</h2>
                        <p>Débusquez l'espion ou trouvez le lieu!</p>
                    </div>
                </div>

                <div className={`games__item  games__item--disabled`}>
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

                <div className={`games__item  games__item--disabled`}>
                    <img className="games__item__thumbnail" src="https://kgames.fr/games/icons/infiltre.png" />
                    <div className="games__item__content">
                        <h2>L'infiltré</h2>
                        <p>Trouvez le mot caché, mais trouvez aussi l'infiltré</p>
                    </div>
                </div>
            </div>

            <button className="btn" onClick={() => selectedGame && setStep(2)}>
                Configurer le jeu
            </button>
        </motion.div>
    );
};