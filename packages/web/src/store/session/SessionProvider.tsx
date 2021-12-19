import React, { ReactNode, useEffect, useState } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

import { SessionContext } from '.';

const GET_ME = gql`
    query me {
        me {
            username
            lobby {
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

    const { loading, error, data: user, refetch } = useQuery(GET_ME);

    const [authenticate, { data, loading: loadingAuthenticate, error: errorAuthenticate}] = useMutation(AUTHENTICATE, {
        onCompleted: ({ auth: token }) => {
            localStorage.setItem('token', token);
            refetch();
        }
    });

    useEffect(() => {
        console.log(user);
    }, [user])

    if(loading) return <p>Loading...</p>;

    return (
        <SessionContext.Provider value={{ user, authenticate }}>
            {props.children}
        </SessionContext.Provider>
    );
}