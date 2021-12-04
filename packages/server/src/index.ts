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

import jwt from 'express-jwt';

import errorFormater from './error-formater';

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

  server.applyMiddleware({ app: app as any });

  httpServer.listen(port, () => {
    console.log('server running on port', port);
  });
}

main();
