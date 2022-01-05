import { Lobby, Player } from '../entity';

export abstract class Game {

    protected lobby: Lobby;

    public configuration: any;

    public hasStarded: boolean = false;

    constructor(lobby: Lobby) {
        this.lobby = lobby;
    }

    public abstract start(): void;
    public abstract reset(): void;

    public on(action: string, data: any, player: Player) {
        
    }
}