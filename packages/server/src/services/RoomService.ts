import { Service } from "typedi";
import { Player, Room } from "../entities";

import shortUUID from 'short-uuid';
const translator = shortUUID();

@Service()
export class RoomService {

    private lobbies: Record<string, Room> = {};

    public createRoom(owner: Player, id?: string): Room {

        if(id === undefined)
            id = translator.new().toString();
        
        const room = new Room();
        room.id = id;
        room.owner = owner;
        owner.room = room;

        room.initialize();

        return this.lobbies[id] = room;
    }

    public getRoom(id: string): Room | null {
        return this.lobbies[id];
    }

    public getRoomOrCreate(owner: Player, id: string): Room {
        
        if(this.lobbies[id])
            return this.lobbies[id];

        return this.createRoom(owner, id);
    }

    public getLobbies(): Room[] {
        return Object.values(this.lobbies);
    }
    
    public clearLobbies() {

        Object.values(this.lobbies).forEach(Room => {
            Room.players.forEach(player => player.socket?.close);
        });

        return this.lobbies = {};
    }

    deleteRoom(id: string) {
        delete this.lobbies[id];
    }
}