import Container from 'typedi';
import { Field, ObjectType } from 'type-graphql';
import { EventEmitter } from 'stream';

import { Player } from './Player';
import { GameMode } from '@kgames/common';
import { Game } from '../socket/core/Game';
import { KcultureService, RoomService} from '../services';
import { Geoquizz, Imposter, Kculture, Undercover } from '../socket/games';
import { Spyfall } from '../socket/games/Spyfall';

@ObjectType()
export class Room extends EventEmitter {

    @Field()
    public id: string;

    @Field(() => Player)
    public owner: Player;

    @Field(() => Number)
    public mode: GameMode = GameMode.GEOQUIZZ;

    @Field(() => [Player])
    public players: Set<Player> = new Set();

    public step: number = 0;

    public selectedGame: string;
    public currentGame: Game;
    
    public games: Game[] = [];

    public getPlayers(): {} {
        return Array.from(this.players).map((p: Player) => ({
            username: p.username,
            owner: p === this.owner,
            picture: p.picture,
            id: p.id
        }))
    }

    leaveRoom(player: Player): void {

        player.room = undefined;
        this.players.delete(player);

        let hasNewOwner = false;
        this.players.forEach((p) => {

            if(!hasNewOwner && this.owner === player) {
                this.owner = p;
                hasNewOwner = true;
                p.socket?.send(JSON.stringify({ event: 'updateowner', owner: true }))
            }

            p.socket?.send(JSON.stringify({ event: 'playerupdate', players: this.getPlayers() }))
        });

        if(this.players.size === 0) {
            setTimeout(() => {

                if(this.players.size === 0)
                    Container.get(RoomService).deleteRoom(this.id);
            })
        }
	}

    addPlayer(player: Player) {

        if(this.players.has(player))
           return;
    
        player.room = this;
		this.players.add(player);

        player.socket?.send(JSON.stringify({ 
            event: 'joinRoom', 
            players: this.getPlayers(), 
            owner: (this.owner === player),
            step: this.step
        }));

        this.players.forEach(player => {
            player.socket?.send(JSON.stringify({ event: 'playerupdate', players: this.getPlayers() }))
        });
	}

    broadcast(event: string, args?: {}) {

        if(args === undefined)
            args = {}

		this.players.forEach(player => {
            player.socket?.send(JSON.stringify({ event, ...args }));
        });
	}

    public initialize(): void {
        this.on('updatestep', this.onUpdateRoomStep.bind(this))
            .on('startgame', this.onStartGame.bind(this))
            .on('updateconfig', this.onUpdateConfig.bind(this))
            .on('updategame', this.onUpdateGame.bind(this))
            .on('reset', this.onReset.bind(this));
    }

    protected onUpdateRoomStep({ step }: any, player: Player): void {

        if(this.owner !== player)
            return;

        this.step = step;

        if(this.step === 2) {

            if(this.selectedGame === 'kculture')
                this.currentGame = new Kculture();
            else if(this.selectedGame === 'geoquizz')
                this.currentGame = new Geoquizz();
            else if(this.selectedGame === 'spyfall')
                this.currentGame = new Spyfall();
            else if(this.selectedGame === 'imposter')
                this.currentGame = new Imposter();
            else if(this.selectedGame === 'undercover')
                this.currentGame = new Undercover();

            if(this.currentGame === null)
                return player.socket?.close();
            
            let configurationFields = {};

            if(this.currentGame instanceof Kculture)
                configurationFields = {
                    theme: { label: 'Thème', type: 'select', items: Container.get(KcultureService).themes },
                    time: { label: 'Temps par question', type: 'number' }
                }
            else if(this.currentGame instanceof Geoquizz) 
                configurationFields = {
                    questionCountries: { label: 'Nombre de questions pays', type: 'number' },
                    questionFlags: { label: 'Nombre de questions drapeaux', type: 'number' },
                    questionCapitals: { label: 'Nombre de questions capitales', type: 'number' },
                    timesPerQuestion: { label: 'Temps par question', type: 'number' }
                }
            else if(this.currentGame instanceof Spyfall) {
                configurationFields = {
                    rounds: { label: 'Nombre de round', type: 'number' },
                    timePerRound: { label: 'Temps par round (min)', type: 'number' }
                }
            }
            else if(this.currentGame instanceof Imposter) {
                configurationFields = {
                    words: { label: 'Nombre de mots', type: 'number' },
                    timesPerRound: { label: 'Temps par mots', type: 'number' }
                }
            } else if(this.currentGame instanceof Undercover) {
                configurationFields = {
                    rounds: { label: 'Nombre de round', type: 'number' },
                    timePerRound: { label: 'Temps par round (min)', type: 'number' }
                }
            }
            
            this.currentGame.room = this;
            this.broadcast('showconfig', { fields: configurationFields, configuration: this.currentGame.configuration });
        }

        this.broadcast('updatestep', { step });
    }

    protected onStartGame(data: any, player: Player): void {

        if(this.owner !== player)
            return;

        this.step = 4;
        this.broadcast('startgame');

        setTimeout(() => {
            this.broadcast('disablecountdown');
            this.currentGame.start();
        }, 3000);
    }

    protected onReset(data: any, player: Player): void {

        if(this.owner !== player)
            return;
        
        this.step = 0;
        this.broadcast('updatestep', { step: 0 });
    }

    protected onUpdateConfig(data: any, player: Player): void {

        if(this.owner !== player)
            return;

        this.currentGame.configuration[data.key] = data.value;
        this.broadcast('updateconfig', { configuration: this.currentGame.configuration });
    }

    protected onUpdateGame(data: any, player: Player): void {

        if(this.owner !== player)
            return;

        this.selectedGame = data.game;
        this.broadcast('updategame', { game: this.selectedGame });
    }

    emit(event: string | symbol, ...args: any[]): boolean {

        if(this.currentGame)
            this.currentGame.emit(event, ...args);

        return super.emit(event, ...args);
    }
}
