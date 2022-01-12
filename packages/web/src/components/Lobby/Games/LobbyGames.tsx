import React, { useContext, useState } from 'react';
import { AnimateSharedLayout, motion } from 'framer-motion';

import { GameContext } from '../../../store';

import './LobbyGames.style.scss';

const container = {
    hidden: { opacity: 0, x: -50 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            staggerChildren: .1,
            delayChildren: 0.1,
        }
    },
    exit: { opacity: 0, x: 50 }
}

const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 }
}

export function LobbyGames() {

    const { websocket, owner } = useContext<{ websocket: WebSocket, owner: boolean }>(GameContext);
    const [ selectedGame, setSelectedGame ] = useState<string>('kculture');

    const setStep = () => {
        websocket.send(JSON.stringify({ event: 'updatestep', step: 2 }));
    }
    
    return (
        <motion.div key={1} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="room__content">
            <h2 className="page-title__subtitle">Selectionner les jeux</h2>

            <motion.div variants={container} className="lobby__games">
                <Item 
                    name={'Imposteur'} 
                    desc={'Trouvez qui est l\'imposteur! À moins que ce soit vous ?'}
                    image={'https://kgames.fr/games/icons/undercover.jpg'}
                    disabled={true}
                    selected={selectedGame === 'imposteur'}
                    onSelect={() => setSelectedGame('imposteur')} />

                <Item 
                    name={'Spyfall'}
                    desc={'Débusquez l\'espion ou trouvez le lieu!'}
                    image="https://kgames.fr/games/icons/spyfall.jpg"
                    disabled={true}
                    selected={selectedGame === 'spyfall'}
                    onSelect={() => setSelectedGame('spyfall')} />

                <Item 
                    name={'Géoquizz'}
                    desc={'Testez votre niveau en géographie, placez des pays, trouvez le nom des drapeaux et des capitales pour gagner le plus de points'}
                    image={'https://kgames.fr/games/icons/geoquizz.jpg'}
                    disabled={true}
                    selected={selectedGame === 'geoquizz'}
                    onSelect={() => setSelectedGame('geoquizz')} />

                <Item 
                    name={'Kculture'}
                    desc={'Testez votre culture générale entre amis !'}
                    image={'https://kgames.fr/games/icons/kculture.jpg'}
                    selected={selectedGame === 'kculture'}
                    onSelect={() => setSelectedGame('kculture')} />

                <Item 
                    name={'L\'infiltré'} 
                    desc={'Trouvez le mot caché, mais trouvez aussi l\'infiltré'} 
                    image={'https://kgames.fr/games/icons/infiltre.png'}
                    disabled={true}
                    selected={selectedGame === 'infiltre'}
                    onSelect={() => setSelectedGame('infiltre')} />
            </motion.div>

            {owner &&
                <button className="btn" onClick={() => selectedGame && setStep()}>
                    Configurer le jeu
                </button>
            }
        </motion.div>
    );
}

const Item = ({ name, desc, image, disabled, selected, onSelect }: any) => (
    <motion.div 
        variants={item} 
        className={`lobby__games__item ${disabled ? 'lobby__games__item--disabled' : ''} ${selected ? 'lobby__games__item--active' : ''}`} 
        {...!disabled && { onClick: onSelect }} >

        <img className="lobby__games__item__thumbnail" src={image} />
        <div className="lobby__games__item__content">
            <h2>{name}</h2>
            <p>{desc}</p>
        </div>

        { selected &&
            <motion.div className="lobby__games__item__selector" layoutId="selector" transition={{ type: "spring", stiffness: 500, damping: 30 }}
                initial={false} />
        }
    </motion.div>
)