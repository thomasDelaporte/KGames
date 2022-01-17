import { EventEmitter } from 'stream';
import { Room, Player } from '../../entities';

export abstract class Game extends EventEmitter {

    public room: Room;

    public configuration: any;
    public hasStarded: boolean = false;

    public abstract start(): void;
}