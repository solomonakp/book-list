import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_BOOKS } from './queries';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === 'development' ? true : false,
});

export default client;
