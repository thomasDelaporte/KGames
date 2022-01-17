import Container from 'typedi';

import { WebSocketServer } from 'ws';
import { Server } from 'http';
import url from 'url';

import { RoomService } from '../services';
import Authentication from '../directives/Authentication';

export function initializeSocketServer(httpServer: Server) {

	const socketServer = new WebSocketServer({ server: httpServer });
	console.log(`🚃 Websocket server ready`);

	const roomService = Container.get(RoomService);
	
	socketServer.on('connection', (socket, req) => {

		if(req.url === undefined)
			return;

		const { query } = url.parse(req.url, true);

		try {

			const player = Authentication(query.token as string);
			player.connectToSocket(socket);

			const room = roomService.getRoomOrCreate(player, query.room as string);

			if(room == null)
				throw new Error('The room couldn\'t be found or created.');

			if(room.currentGame && room.currentGame.hasStarded)
				throw new Error('The game has already started.');

			room.addPlayer(player);

			player.socket?.on('close', () => room.leaveRoom(player));
			player.socket?.on('message', (message) => {

				const data = JSON.parse(message.toString());
				room.emit(data.event, data, player);
			});
		} catch (error) {

			console.error(error);
			socket.close();
		}
	});
}