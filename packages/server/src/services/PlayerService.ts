import { Service } from 'typedi';
import { Player } from '../entities';
import { User } from '@prisma/client';

import jwt from 'jsonwebtoken';

import shortUUID from 'short-uuid';
const translator = shortUUID();

@Service()
export class PlayerService {

    private players: Record<string, Player> = {};

    /**
     * Authenticate an user.
     * 
     * @param username 
     * @returns string
     */
    public authenticate(username: string): { token: string, player: Player } {

        const id = translator.new().toString();
        const player = new Player();
        player.id = id;
        player.username = username;

        this.players[player.id] = player;
        
        const token = jwt.sign(player.id, process.env.SESSION_SECRET as string, {
            algorithm: 'HS256' 
        });

        return { token, player };
    }

    /**
     * Authenticate as an signup user from social.
     * 
     * @param user 
     * @returns 
     */
    public authenticateAsUser(user: User): { token: string, player: Player } {
        
        const player = new Player();
        player.id = user.id.toString();
        player.username = user.name;
        player.picture = user.picture;

        this.players[player.id] = player;

        const token = jwt.sign(player.id, process.env.SESSION_SECRET as string, {
            algorithm: 'HS256' 
        });

        return { token, player };
    }

    /**
     * Get a player.
     * @param id 
     * @returns Player
     */
    public getPlayer(id: string): Player | null {
        return this.players[id];
    }
}