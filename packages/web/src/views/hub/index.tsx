import React, { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';

import Login from '../../components/Login';
import { SessionContext } from '../../store';

import './index.scss';
import { useHistory } from 'react-router-dom';
import Account from '../../components/Account';

const CREATE_LOBBY = gql`
	mutation createLobby {
		createLobby {
			id
		}
	}
`;

export function Hub() {

	const { user } = useContext(SessionContext);
	const history = useHistory();

	const [createLobby, { data: lobby, loading, error }] = useMutation(CREATE_LOBBY, {
		onCompleted: ({ createLobby }) => history.push(`/lobby/${createLobby.id}`)
	});

	if(!user)
		return <Login />

	return (
		<div className="hub">
			<h1 className="page-title">Hub.</h1>

			<Account />

			<button className="btn" onClick={user && createLobby}>Créer un lobby</button>
		</div>
	);	
}
