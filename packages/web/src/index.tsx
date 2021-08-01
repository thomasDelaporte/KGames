import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

import './styles/index.scss'

import Layout from './components/Layout';

import LoginPage from './pages/login';
import LobbyPage from './pages/lobby';

const App = () => (
    <BrowserRouter>
        <Layout>
            <Switch>
                <Route path='/lobby/:id' component={LobbyPage} />
                <Route path='/' component={LoginPage} />
            </Switch>
        </Layout>
    </BrowserRouter>
)

ReactDOM.render(
    <App />, document.getElementById('root'));
