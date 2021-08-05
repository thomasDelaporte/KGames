import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_API,
  cache: new InMemoryCache(),
});

import './styles/index.scss';

import Layout from './components/Layout';

import LoginPage from './pages/login';
import LobbyPage from './pages/lobby';

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/lobby/:id" component={LobbyPage} />
          <Route path="/" component={LoginPage} />
        </Switch>
      </Layout>
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
