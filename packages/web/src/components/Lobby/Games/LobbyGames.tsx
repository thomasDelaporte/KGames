import React, { useContext, useEffect, useState } from 'react';
import { AnimateSharedLayout, motion } from 'framer-motion';

import { GameContext } from '../../../store';

import UndercoverIcon from '../../../assets/icons/undercover.jpg';
import SpyfallIcon from '../../../assets/icons/spyfall.jpg';
import GeoquizzIcon from '../../../assets/icons/geoquizz.jpg';
import KcultureIcon from '../../../assets/icons/kculture.jpg';
import InfiltreIcon from '../../../assets/icons/infiltre.jpg';

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

export function LobbyGames({ game }: any) {

    const { websocket, owner } = useContext<{ websocket: WebSocket, owner: boolean }>(GameContext);

    const setStep = () => {

        if(!game)
            return;
            
        websocket.send(JSON.stringify({ event: 'updatestep', step: 2 }));
    }

    const updateGame = (game: string) => {
        websocket.send(JSON.stringify({ event: 'updategame', game }));
    }
    
    return (
        <motion.div key={1} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="room__content">
            <h2 className="page-title__subtitle">Selectionner les jeux</h2>

            <motion.div variants={container} className="lobby__games">
                <Item 
                    name={'Undercover'} 
                    desc={'Trouvez qui est l\'imposteur! À moins que ce soit vous ?'}
                    image={UndercoverIcon}
                    disabled={!owner}
                    selected={game === 'undercover'}
                    {...owner && { onSelect: updateGame.bind(null, 'undercover')}}  />

                <Item 
                    name={'Spyfall'}
                    desc={'Débusquez l\'espion ou trouvez le lieu!'}
                    image={SpyfallIcon}
                    disabled={!owner}
                    selected={game === 'spyfall'}
                    {...owner && { onSelect: updateGame.bind(null, 'spyfall')}}  />

                <Item 
                    name={'Géoquizz'}
                    desc={'Testez votre niveau en géographie, placez des pays, trouvez le nom des drapeaux et des capitales pour gagner le plus de points'}
                    image={GeoquizzIcon}
                    disabled={!owner}
                    selected={game === 'geoquizz'}
                    {...owner && { onSelect: updateGame.bind(null, 'geoquizz')}}  />

                <Item 
                    name={'Kculture'}
                    desc={'Testez votre culture générale entre amis !'}
                    image={KcultureIcon}
                    disabled={!owner}
                    selected={game === 'kculture'}
                    {...owner && { onSelect: updateGame.bind(null, 'kculture')}}  />

                <Item 
                    name={'L\'infiltré'} 
                    desc={'Trouvez le mot caché, mais trouvez aussi l\'infiltré'} 
                    image={InfiltreIcon}
                    disabled={!owner}
                    selected={game === 'infiltre'}
                    {...owner && { onSelect: updateGame.bind(null, 'infiltre')}} />
            </motion.div>

            {owner &&
                <button className="btn" {...game && owner && { onClick: setStep }}>
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