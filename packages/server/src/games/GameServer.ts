import { WebSocketServer } from 'ws';
import Authentication from '../directives/Authentication';

import url from 'url';
import { RoomService } from '../services';
import Container, { Inject, Service } from 'typedi';
import { Kculture } from './Kculture';
import { KcultureService } from '../services/KcultureService';
import { Geoquizz } from './Geoquizz';

export default class GameServer {

	private server: WebSocketServer;

	public RoomService: RoomService = Container.get(RoomService);

	constructor(httpServer: any) {

		this.server = new WebSocketServer({ server: httpServer });
		console.log(`🚃 Websocket server ready`);

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
					
				if(Room.currentGame && Room.currentGame.hasStarded)
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

						if(Room.owner !== player)
							return;

						Room.step = data.step;

						if(Room.step === 2) {

							if(Room.selectedGame === 'kculture')
								Room.currentGame = new Kculture(Room);
							else if(Room.selectedGame === 'geoquizz')
								Room.currentGame = new Geoquizz(Room);

							let configurationFields = {};

							if(Room.currentGame instanceof Kculture)
								configurationFields = {
									theme: { label: 'Thème', type: 'select', items: Container.get(KcultureService).themes },
									time: { label: 'Temps par question', type: 'number' }
								}
							else if(Room.currentGame instanceof Geoquizz) 
								configurationFields = {
									questionCountries: { label: 'Nombre de questions pays', type: 'number' },
									questionFlags: { label: 'Nombre de questions drapeaux', type: 'number' },
									questionCapitals: { label: 'Nombre de questions capitales', type: 'number' }
								}

							Room.broadcast('showconfig', { fields: configurationFields, configuration: Room.currentGame.configuration });
						}
						Room.broadcast('updatestep', { step: Room.step });
					} else if(data.event === 'startgame' ) {

						if(Room.owner !== player)
							return;

						Room.step = 4;
						Room.broadcast('startgame');

						setTimeout(() => {
							Room.broadcast('disablecountdown');
							Room.currentGame.start();
						}, 3000);
					} else if(data.event === 'reset') {

						if(Room.owner !== player)
							return;
						
						Room.currentGame.reset();
						Room.step = 0;
						Room.broadcast('updatestep', { step: 0 });

					} else if(data.event === 'updateconfig') {

						if(Room.owner !== player)
							return;

						Room.currentGame.configuration[data.key] = data.value;
						Room.broadcast('updateconfig', { configuration: Room.currentGame.configuration });
					} else if(data.event === 'updategame') {
						
						if(Room.owner !== player)
							return;

						Room.selectedGame = data.game;
						Room.broadcast('updategame', { game: Room.selectedGame });
					} else if(Room.currentGame.hasStarded && player) {
						Room.currentGame.on(data.event, data, player);
					}
				})
			} catch (error) {

				console.error(error);
				socket.close();
			}
		});
	}
}