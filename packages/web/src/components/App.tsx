import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { SessionProvider } from '../store';

import { Lobby, Hub } from '../views/';
import Countdown from './Countdown';

export default function App() {
    return (
        <main className="main">            
            <BrowserRouter>
                <SessionProvider>
                    <Switch>
                        <Route exact path='/' component={Hub} />
                        <Route path='/lobby/:id' component={Lobby}/>
                    </Switch>
                </SessionProvider>
            </BrowserRouter>
        </main>
    );
}