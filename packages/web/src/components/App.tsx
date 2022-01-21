import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { SessionContext, SessionProvider } from '../store';
import { Room, Hub } from '../views/';
import Account from './Account/Account';

export default function App() {
    return (
        <BrowserRouter>
            <SessionProvider>
                <Account />
                
                <Routes>
                    <Route path='/' element={<Hub />} />
                    <Route path='/room/:id' element={<Room />} />
                </Routes>
            </SessionProvider>
        </BrowserRouter>
    );
}