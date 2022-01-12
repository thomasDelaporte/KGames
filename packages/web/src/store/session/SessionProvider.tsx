import React, { ReactNode, useEffect, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { SessionContext } from './SessionContext';

export const GET_ME = gql`
    query me {
        me {
            username
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

export function SessionProvider(props: { children: ReactNode }): JSX.Element {

    const history = useHistory();

    const { loading, error, data: user, refetch } = useQuery(GET_ME, {
        onCompleted: ({ me }) => {
            if(history && me.room)
                history.push(`/room/${me.room.id}`);
        }
    });

    const onAuthenticate = (token: string) => {
        localStorage.setItem('token', token);
        refetch();
    }

    const [authenticate] = useMutation(AUTHENTICATE, { onCompleted: ({ auth: token}) => onAuthenticate(token) });
    const [authenticateAsUser] = useMutation(AUTHENTICATE_TWITCH, { onCompleted: ({ authTwitch: token }) => onAuthenticate(token) })

    if(loading) return <p>Loading...</p>;

    return (
        <SessionContext.Provider value={{ user, authenticate, authenticateAsUser }}>
            {props.children}
        </SessionContext.Provider>
    );
}