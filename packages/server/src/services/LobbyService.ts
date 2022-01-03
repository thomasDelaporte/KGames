import { Service } from "typedi";
import { Lobby, Player } from "../entity";

import shortUUID from 'short-uuid';
const translator = shortUUID();

@Service()
export class LobbyService {

    private lobbies: Record<string, Lobby> = {};

    public createLobby(owner: Player, id?: string): Lobby {

        if(id === undefined)
            id = translator.new().toString();
        
        const lobby = new Lobby();
        lobby.id = id;
        lobby.owner = owner;
        owner.lobby = lobby;

        return this.lobbies[id] = lobby;
    }

    public getLobby(id: string): Lobby | null {
        return this.lobbies[id];
    }

    public getLobbyOrCreate(owner: Player, id: string): Lobby {
        
        if(this.lobbies[id])
            return this.lobbies[id];

        return this.createLobby(owner, id);

    }

    public getLobbies(): Lobby[] {
        return Object.values(this.lobbies);
    }
    
    public clearLobbies() {

        Object.values(this.lobbies).forEach(lobby => {
            lobby.players.forEach(player => player.socket?.close);
        });

        this.lobbies = {};
    }
}