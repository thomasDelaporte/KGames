import { IncomingMessage } from 'http';
import { WebSocketServer } from 'ws';
import Authentication from '../directives/Authentication';

import url from 'url';
import { LobbyService } from '../services';
import Container, { Inject, Service } from 'typedi';
import { isFunction } from 'util';
import { Geoquizz } from './Geoquizz';

export default class GameServer {

	private server: WebSocketServer;

	public lobbyService: LobbyService = Container.get(LobbyService);

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
				const lobby = this.lobbyService.getLobbyOrCreate(player, query.lobby as string);

				if(lobby == null)
					throw new Error('oui');

				if(lobby.game === undefined)
					lobby.game = new Geoquizz(lobby);
					
				if(lobby.game && lobby.game.hasStarded)
					socket.close();

				player.joinLobby(lobby, socket);
				lobby.addPlayer(player);
				
				console.log(`Player ${player.username} connected to ${query.lobby}`);

				socket.send(JSON.stringify({ 
					event: 'joinlobby', 
					players: lobby.getPlayers(), 
					owner: (lobby.owner === player),
					step: lobby.step
				}));

				socket.on('close', () => lobby.leaveLobby(player));
				socket.on('message', (message) => {
					
					const data = JSON.parse(message.toString());

					if(data.event === 'updatestep' && lobby.owner === player) {
						lobby.step = data.step;
						lobby.broadcast('updatestep', { step: lobby.step });
					} else if(data.event === 'startgame' ) {

						lobby.broadcast('startgame');

						setTimeout(() => {
							lobby.step = 4;
							lobby.broadcast('updatestep', { step: lobby.step });
							lobby.game.start();
						}, 3000);
					} else if(data.event === 'reset') {
						lobby.game.reset();
					} else if(data.event === 'updateconfig') {

						const configurations = data;
						delete configurations['delete'];

						lobby.game.configuration = configurations;
						lobby.broadcast('updateconfig', configurations);
					}
				})
			} catch (error) {

				console.error(error);
				socket.close();
			}
		});
	}
}