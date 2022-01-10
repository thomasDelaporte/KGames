require('dotenv').config();

import 'reflect-metadata';
import { Container } from 'typedi';

import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, AuthenticationError } from 'apollo-server-core';

import express from 'express';
import http from 'http';
import jwt from 'jsonwebtoken';

import { RoomResolver, PlayerResolver } from './resolvers';
import { PlayerService } from './services';
import { AuthorizationDerective } from './directives/Authorization';
import GameServer from './games/GameServer';
import { onAuthenticateTwitch } from './controllers/AuthenticationController';

(async function() {
		
	const schema = await buildSchema({
		container: Container,
		resolvers: [ RoomResolver, PlayerResolver ],
		authChecker: AuthorizationDerective,
		emitSchemaFile: true
	});

	const app = express();
	const httpServer = http.createServer(app);
	
	const server = new ApolloServer({ 
		schema,
		context: ({ req }): any => {

			const token = req.headers.authorization;

			if(token == undefined || token == 'null')
				return {};
			
			const playerId = jwt.verify(token, process.env.SESSION_SECRET as string);
			const playerService = Container.get(PlayerService);
			const player = playerService.getPlayer(playerId.toString());

			if(player === undefined)
				throw new AuthenticationError('The player not existing anymore');
			
			return { player };
		},
		plugins: [ ApolloServerPluginDrainHttpServer({ httpServer })]
	});

	app.get('/auth/twitch', onAuthenticateTwitch);

	await server.start();
	server.applyMiddleware({ app, path: '/' });

	const port = process.env.PORT || 4000;
	await new Promise<void>(resolve => httpServer.listen({ port }, resolve));
	console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);

	new GameServer(httpServer);
})();