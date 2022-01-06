import React, { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';

import Login from '../../components/Login';
import { SessionContext } from '../../store';

import './index.scss';
import { useHistory } from 'react-router-dom';
import Account from '../../components/Account';

const CREATE_Room = gql`
	mutation createRoom {
		createRoom {
			id
		}
	}
`;

export function Hub() {

	const { user } = useContext(SessionContext);
	const history = useHistory();

	const [createRoom, { data: Room, loading, error }] = useMutation(CREATE_Room, {
		onCompleted: ({ createRoom }) => history.push(`/Room/${createRoom.id}`)
	});

	if(!user)
		return <Login />

	return (
		<div className="hub">
			<h1 className="page-title">Hub.</h1>

			<Account />

			<button className="btn" onClick={user && createRoom}>Créer un Room</button>
		</div>
	);	
}
