import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import App from './components/App';

import './styles/index.scss';

const authLink = setContext((request, previousContext) => ({
    headers: { authorization: localStorage.getItem('token') }
}));

const authError = onError(({ graphQLErrors }) => {
    
    if(!graphQLErrors)
        return;

    for(let err of graphQLErrors) {

        if( err && err.extensions ) {
            switch (err.extensions.code) {
                case 'UNAUTHENTICATED':
                    localStorage.removeItem('token');
                    break;
            }
        }
    }
});

const httpLink = createHttpLink({ uri: import.meta.env.VITE_API });

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([authLink, authError, httpLink]),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);
