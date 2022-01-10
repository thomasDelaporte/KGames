import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { SessionProvider } from '../store';
import { Room, Hub } from '../views/';

export default function App() {
    return (
        <BrowserRouter>
            <SessionProvider>
                <Switch>
                    <Route exact path='/' component={Hub} />
                    <Route path='/room/:id' component={Room} />
                </Switch>
            </SessionProvider>
        </BrowserRouter>
    );
}