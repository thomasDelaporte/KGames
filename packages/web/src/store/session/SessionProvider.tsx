import React, { ReactNode, useEffect, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { SessionContext } from '.';

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

export function SessionProvider(props: { children: ReactNode }): JSX.Element {

    const history = useHistory();

    const { loading, error, data: user, refetch } = useQuery(GET_ME, {
        onCompleted: ({ me }) => {
            if(history && me.room)
                history.push(`/room/${me.room.id}`);
        }
    });

    const [authenticate, { data, loading: loadingAuthenticate, error: errorAuthenticate}] = useMutation(AUTHENTICATE, {
        onCompleted: ({ auth: token }) => {
            localStorage.setItem('token', token);
            refetch();
        }
    });

    if(loading) return <p>Loading...</p>;

    return (
        <SessionContext.Provider value={{ user, authenticate }}>
            {props.children}
        </SessionContext.Provider>
    );
}