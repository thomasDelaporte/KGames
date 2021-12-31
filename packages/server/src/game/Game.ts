import { Lobby } from '../entity';

export abstract class Game {

    protected lobby: Lobby;
    public hasStarded: boolean = false;

    constructor(lobby: Lobby) {
        this.lobby = lobby;
    }

    public abstract start(): void;
    public abstract reset(): void;
}