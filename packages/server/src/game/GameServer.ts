import { IncomingMessage } from 'http';
import { WebSocketServer } from 'ws';
import Authentication from '../directives/Authentication';

import url from 'url';
import { RoomService } from '../services';
import Container, { Inject, Service } from 'typedi';
import { isFunction } from 'util';
import { Geoquizz } from './Geoquizz';

export default class GameServer {

	private server: WebSocketServer;

	public RoomService: RoomService = Container.get(RoomService);

	constructor(server: any) {

		this.server = new WebSocketServer({ server }, () => {
			console.log(`🚃 Websocket server ready`);
		});

		this.server.on('connection', (socket, req) => {

			if( req.url === undefined )
				return;

			const { query } = url.parse(req.url, true);

			try {

				const player = Authentication(query.token as string);
				player.socket = socket;

				const Room = this.RoomService.getRoomOrCreate(player, query.room as string);

				if(Room == null)
					throw new Error('oui');

				if(Room.game === undefined)
					Room.game = new Geoquizz(Room);
					
				if(Room.game && Room.game.hasStarded)
					socket.close();

				Room.addPlayer(player);
				
				console.log(`Player ${player.username} connected to ${query.room}`);

				socket.send(JSON.stringify({ 
					event: 'joinRoom', 
					players: Room.getPlayers(), 
					owner: (Room.owner === player),
					step: Room.step
				}));

				socket.on('close', () => Room.leaveRoom(player));
				socket.on('message', (message) => {
					
					const data = JSON.parse(message.toString());

					if(data.event === 'updatestep' && Room.owner === player) {
						Room.step = data.step;
						Room.broadcast('updatestep', { step: Room.step });
					} else if(data.event === 'startgame' ) {

						Room.broadcast('startgame');

						setTimeout(() => {
							Room.step = 4;
							Room.broadcast('updatestep', { step: Room.step });
							Room.game.start();
						}, 3000);
					} else if(data.event === 'reset') {
						
						Room.game.reset();
						Room.step = 0;
						Room.broadcast('updatestep', { step: 0 });

					} else if(data.event === 'updateconfig') {

						const configurations = data;
						delete configurations['delete'];

						Room.game.configuration = configurations;
						Room.broadcast('updateconfig', configurations);
					} else if(Room.game.hasStarded && player) {
						Room.game.on(data.event, data, player);
					}
				})
			} catch (error) {

				console.error(error);
				socket.close();
			}
		});
	}
}