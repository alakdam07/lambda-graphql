import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import {
  ApolloServer,
  AuthenticationError,
  ForbiddenError,
  gql,
} from 'apollo-server-lambda';

import * as R from 'ramda';

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

export const authToken = (token: string) => {
  if (token === 'HELLO') {
    return true;
  } else {
    throw new AuthenticationError('No authorization header supplied');
  }
};

const server = new ApolloServer({
  typeDefs,
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
