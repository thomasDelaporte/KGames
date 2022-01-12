import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { SessionProvider } from '../store';
import { Room, Hub } from '../views/';

export default function App() {
    return (
        <BrowserRouter>
            <SessionProvider>
                <Routes>
                    <Route path='/' element={<Hub />} />
                    <Route path='/room/:id' element={<Room />} />
                </Routes>
            </SessionProvider>
        </BrowserRouter>
    );
}