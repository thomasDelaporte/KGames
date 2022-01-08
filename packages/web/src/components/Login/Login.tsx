import React, { useState, useRef, useContext, SyntheticEvent } from 'react';
import { SessionContext } from '../../store';

import './Login.style.scss';

export default function Login() {

    const { authenticate } = useContext(SessionContext);

    const [username, setUsername] = useState(localStorage.getItem('username') || '');
	const usernameRef = useRef<HTMLInputElement>(null);

    const login = (e: SyntheticEvent) => {

        e.preventDefault();

        if (usernameRef.current) 
            usernameRef.current.reportValidity();
        
        if(username === '')
            return;

        localStorage.setItem('username', username);
        authenticate({ variables: { username } });
    }

    return (
        <form className="login" onSubmit={login}>
            <h1 className="page-title">Connexion.</h1>

            <button className="btn btn--clear">
                <svg className="btn__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z" fillRule="evenodd" clipRule="evenodd" />
                </svg>
                Continuer avec Google
            </button>

            <button className="btn btn--clear">
                <svg className="btn__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z" fillRule="evenodd" clipRule="evenodd" />
                </svg>
                Continuer avec Twitch
            </button>

            <span className="login__or">ou</span>
            
            <input type="text" className="input" placeholder="Identifiant" value={username} onChange={(e) => setUsername(e.target.value)} 
                ref={usernameRef} required />
            
            <button className="btn" onClick={login}>S'authentifier</button>
        </form>
    )
}