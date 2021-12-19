
/*const websocketServer = new WebSocketServer({ server: httpServer });
  
	websocketServer.on('connection', function(socket) {
		socket.on('message', function message(message: string) {
		
		console.log('received: %s', message);
		const data = JSON.parse(message);
		
		if( data.e === 'joinlobby' ) {

			try {

			const token = data.token;
			const lobbyId = data.lobby;
			
			const user: any = realjwt.verify(token, process.env.SESSION_SECRET as string, {
				algorithms: ['HS256']
			});

			const lobby = Lobby.Lobbies.get(lobbyId);
			const player = Player.Players.get(user.id);

			if( lobby !== undefined && player !== undefined ) {

				lobby.addPlayer(player);
				socket.send(JSON.stringify({ e: 'onjoinlobby' }));
			}
			} catch(e) { 
			console.error(e);
			//ignore 
			}
		}
		});*/