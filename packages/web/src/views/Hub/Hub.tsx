import React, { useContext } from 'react';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import Login from '../../components/Login/Login';
import Account from '../../components/Account/Account';

import { SessionContext } from '../../store';

import './Hub.style.scss';

const CREATE_Room = gql`
	mutation createRoom {
		createRoom {
			id
		}
	}
`;

export function Hub() {

	const { user } = useContext(SessionContext);
	const navigate = useNavigate();

	const [createRoom] = useMutation(CREATE_Room, {
		onCompleted: ({ createRoom }) => navigate(`/room/${createRoom.id}`)
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
