import { Room, Player } from '../entities';

export abstract class Game {

    protected room: Room;

    public configuration: any;
    public static configurationFields: any;

    public hasStarded: boolean = false;


    constructor(Room: Room) {
        this.room = Room;
    }

    public abstract start(): void;
    public abstract reset(): void;

    public on(action: string, data: any, player: Player) {}
}