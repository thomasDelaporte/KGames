import { Container } from 'typedi';
import { PlayerService } from '../services';
import { AuthenticationError } from 'apollo-server-core';

import jwt from 'jsonwebtoken';

export default function Authentication(token: string) {

    const playerId = jwt.verify(token, process.env.SESSION_SECRET as string);
    const playerService = Container.get(PlayerService);
    const player = playerService.getPlayer(playerId.toString());

    if(player === undefined || player === null)
        throw new AuthenticationError('The player not existing anymore');

    return player;
}