import React, { ReactNode } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

import { SessionContext } from './SessionContext';

export const GET_ME = gql`
    query me {
        me {
            id
            username
            picture
            room {
                id
            }
        }
    }
`;

const AUTHENTICATE = gql`
	mutation authenticate($username: String!) {
		auth(username: $username)
	}
`;

const AUTHENTICATE_TWITCH = gql`
    mutation AuthTwitch($accessToken: String!) {
        authTwitch(access_token: $accessToken)
    }
`;

const AUTHENTICATE_GOOGLE = gql`
    mutation AuthGoogle($idToken: String!) {
        authGoogle(id_token: $idToken)
    }
`;

export function SessionProvider(props: { children: ReactNode }): JSX.Element {

    const navigate = useNavigate();

    const { loading, error, data: user, refetch } = useQuery(GET_ME, {
        onCompleted: ({ me }) => {
            if(history && me.room)
                navigate(`/room/${me.room.id}`);
        }
    });

    const onAuthenticate = (token: string) => {
        localStorage.setItem('token', token);
        refetch();
    }

    const [authenticate] = useMutation(AUTHENTICATE, { onCompleted: ({ auth: token}) => onAuthenticate(token) });
    const [authenticateTwitch] = useMutation(AUTHENTICATE_TWITCH, { onCompleted: ({ authTwitch: token }) => onAuthenticate(token) });
    const [authenticateGoogle] = useMutation(AUTHENTICATE_GOOGLE, { onCompleted: ({ authGoogle: token }) => onAuthenticate(token) })

    if(loading) return <p>Loading...</p>;

    return (
        <SessionContext.Provider value={{ user, authenticate, authenticateTwitch, authenticateGoogle }}>
            {props.children}
        </SessionContext.Provider>
    );
}