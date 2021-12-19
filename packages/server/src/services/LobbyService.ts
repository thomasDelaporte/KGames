import { Service } from "typedi";
import { Lobby, Player } from "../entity";

import shortUUID from 'short-uuid';
const translator = shortUUID();

@Service()
export class LobbyService {

    private lobbies: Record<string, Lobby> = {};

    public createLobby(owner: Player): Lobby {

        const id = translator.new().toString();
        const lobby = new Lobby();
        lobby.id = id;
        lobby.owner = owner;

        return this.lobbies[id] = lobby;
    }

    public getLobby(id: string): Lobby | null {
        return this.lobbies[id];
    }

    public getLobbies(): Lobby[] {
        return Object.values(this.lobbies);
    }
}