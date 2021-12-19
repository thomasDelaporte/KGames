require('dotenv').config();

import 'reflect-metadata';
import { Container } from 'typedi';

import { buildSchema } from 'type-graphql';
import { ApolloServer, AuthenticationError } from 'apollo-server';

import { LobbyResolver, PlayerResolver } from './resolver';
import { PlayerService } from './services';

import jwt from 'jsonwebtoken';
import { AuthorizationDerective } from './directives/Authorization';

(async function() {
		
	const schema = await buildSchema({
		container: Container,
		resolvers: [ LobbyResolver, PlayerResolver ],
		authChecker: AuthorizationDerective,
		emitSchemaFile: true
	});

	const port = process.env.PORT || 4000;
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
		}
	});

	await server.listen({ port }).then(({ url }) => {
		console.log(`🚀 Server ready at ${url}`);
	});

})();