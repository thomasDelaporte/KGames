import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { KGamesProvider } from './store';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Layout from './components/Layout';
import { App } from './App';

import './styles/index.scss';

const authLink = setContext((_, { request, headers }) => {

    const token = localStorage.getItem('token');
    console.log(token, '<= Token');
    if (token !== '') {
        return {
            headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : '',
            },
        };
    } else {
        return {
            headers: {
                ...headers,
            },
        };
    }
});

const link = createHttpLink({ uri: import.meta.env.VITE_API });

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authLink.concat(link)]),
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
