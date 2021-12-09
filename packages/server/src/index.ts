require('dotenv').config();
import 'reflect-metadata';
import { buildSchema, BuildSchemaOptions } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { LobbyResolver, UserResolver } from './resolver';
import { authChecker } from './utils/auth-checker';
import express from 'express';
import path from 'path';
import http from 'http';
import cors from 'cors';
import { WebSocketServer } from 'ws';

import jwt from 'express-jwt';
import realjwt from 'jsonwebtoken';

import errorFormater from './error-formater';
import { Lobby, Player } from './entity';

async function main() {
  const schema = await buildSchema({
    resolvers: [LobbyResolver, UserResolver],
    authChecker,
    validate: false,
  });

  const server = new ApolloServer({
    schema,
    context: (http) => ({ req: http.req, res: http.res }),
    formatError: errorFormater,
    plugins: [
      process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
  });

  await server.start();
  const app = express();
  const httpServer = http.createServer(app);
  const port = process.env.PORT || 4000;

  const corsOptions = {
    credentials: true,
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.PROD_ORIGIN
        : process.env.DEV_ORIGIN,
  };

  app.set('trust proxy', 1);
  app.use(cors(corsOptions));
  app.use(
    '/graphql',
    jwt({
      secret: process.env.SESSION_SECRET as string,
      algorithms: ['HS256'],
      credentialsRequired: false,
    })
  );

  const websocketServer = new WebSocketServer({ server: httpServer });
  
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
    });
  });

  server.applyMiddleware({ app: app as any });

  httpServer.listen(port, () => {
    console.log('server running on port', port);
  });
}

main();
