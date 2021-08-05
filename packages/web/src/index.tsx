import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { App } from './App';
import { KGamesProvider } from './store';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';
import Layout from './components/Layout';
import './styles/index.scss';

const client = new ApolloClient({
  uri: import.meta.env.VITE_API,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Layout>
        <KGamesProvider>
          <App />
        </KGamesProvider>
      </Layout>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
