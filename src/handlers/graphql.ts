/* eslint-disable @typescript-eslint/no-var-requires */
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import {
  ApolloServer,
  AuthenticationError,
  ForbiddenError,
} from 'apollo-server-lambda';
import schema from '../graphql/schema';
import resolvers from '../resolvers';
import * as R from 'ramda';
//import { APIGatewayProxyEvent, Context } from 'aws-lambda';
export const authToken = (token: string) => {
  if (token === 'HELLO') {
    return true;
  } else {
    throw new AuthenticationError('No authorization header supplied');
  }
};

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  debug: false,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  context: ({ event }) => {
    if (R.isNil(event.headers.authorization))
      throw new ForbiddenError('You must be authenticated');

    return authToken(event.headers.authorization);
  },
  introspection: true,
});

exports.graphql = server.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: '*',
      credentials: true,
      allowedHeaders: ['Content-Type', 'Origin', 'Accept', 'authorization'],
      optionsSuccessStatus: 200,
      maxAge: 200,
      exposedHeaders: ['authorization'],
    },
  },
});
