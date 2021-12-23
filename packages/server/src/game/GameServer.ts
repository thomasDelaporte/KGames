import { IncomingMessage } from 'http';
import { WebSocketServer } from 'ws';
import Authentication from '../directives/Authentication';

import url from 'url';
import { LobbyService } from '../services';
import Container, { Inject, Service } from 'typedi';

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
						}, 1200);
					}
				})
			} catch (error) {

				console.error(error);
				socket.close();
			}
		});
	}
}