require('dotenv').config();
import 'reflect-metadata';
import { buildSchema, BuildSchemaOptions } from 'type-graphql';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { LobbyResolver, UserResolver } from './resolver';

import * as express from 'express';
import * as path from 'path';
import * as http from 'http';

import errorFormater from './error-formater';

async function main() {
  const schema = await buildSchema({
    resolvers: [LobbyResolver, UserResolver],
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
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.PROD_ORIGIN
        : process.env.DEV_ORIGIN,
  };

  app.set('trust proxy', 1);

  server.applyMiddleware({ app: app as any, cors: corsOptions });

  httpServer.listen(port, () => {
    console.log('server running on port', port);
  });
}

main();
