import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';

import './index.scss';
import { useKGames } from '../../store';

const ME = gql`
  query me {
    me {
      id
      username
      lobby {
        id
        owner {
          id
          username
        }
        mode
      }
    }
  }
`;

type MeResponse = {
  me: {
    id: string;
    username: string;
    lobby: {
      id: string;
      owner: {
        id: string;
        username: string;
      };
      mode: number;
    };
  };
};

const CREATE_LOBBY = gql`
  mutation createLobby {
    createLobby
  }
`;

const AUTH = gql`
  mutation auth($username: String!) {
    auth(username: $username)
  }
`;

type AuthVariable = {
  username: string;
};

type AuthResponse = {
  auth: string;
};

export function LoginPage() {
  const {
    actions: { dispatch },
  } = useKGames();
  const history = useHistory();
  const [login, setLogin] = useState<string>();
  const loginRef = useRef<HTMLInputElement>(null);

  const [authentify, { loading, error, data }] = useMutation<
    AuthResponse,
    AuthVariable
  >(AUTH);

  const [getMe, { loading: loadingMe, error: errorMe, data: dataMe }] =
    useLazyQuery<MeResponse>(ME);

  const [tryLogin, setTryLogin] = useState(false);

  // if (loading) return <p>Submitting...</p>;
  // if (error) return <p>Submission error! {error.message}</p>;

  const createLobbyAsInvite = () => {
    console.log(login);
    if (!login) return;
    authentify({
      variables: {
        username: login as string,
      },
    });

    setTryLogin(true);
    if (loginRef.current) loginRef.current.reportValidity();
  };

  useEffect(() => {
    if (tryLogin) {
      if (!loading && !error && data) {
        if (data.auth) {
          window.localStorage.setItem('token', data.auth);
          getMe();
          //history.push()
        }
      }
    }
  }, [loading, data, error, tryLogin]);

  useEffect(() => {
    if (!loadingMe && !errorMe && dataMe) {
       console.log(dataMe.me)
      if (dataMe.me) {
        dispatch({
          type: 'login',
          player: dataMe.me,
        });
        console.log(dataMe.me)
        history.push(`/lobby/${dataMe.me.lobby.id}`);
      }
    }
  }, [loadingMe, errorMe, dataMe]);

  return (
    <div className="login">
      <h1 className="page-title">Connexion.</h1>

      <button className="btn btn--clear">
        <svg
          className="btn__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M7 11v2.4h3.97c-.16 1.029-1.2 3.02-3.97 3.02-2.39 0-4.34-1.979-4.34-4.42 0-2.44 1.95-4.42 4.34-4.42 1.36 0 2.27.58 2.79 1.08l1.9-1.83c-1.22-1.14-2.8-1.83-4.69-1.83-3.87 0-7 3.13-7 7s3.13 7 7 7c4.04 0 6.721-2.84 6.721-6.84 0-.46-.051-.81-.111-1.16h-6.61zm0 0 17 2h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        Continuer avec Google
      </button>
      <button className="btn btn--clear">
        <svg
          className="btn__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M2.149 0l-1.612 4.119v16.836h5.731v3.045h3.224l3.045-3.045h4.657l6.269-6.269v-14.686h-21.314zm19.164 13.612l-3.582 3.582h-5.731l-3.045 3.045v-3.045h-4.836v-15.045h17.194v11.463zm-3.582-7.343v6.262h-2.149v-6.262h2.149zm-5.731 0v6.262h-2.149v-6.262h2.149z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
        Continuer avec Twitch
      </button>

      <span className="login__or">ou</span>

      <input
        type="text"
        className="input"
        placeholder="Identifiant"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        ref={loginRef}
        required
      />
      <button className="btn" onClick={createLobbyAsInvite}>
        S'authentifier
      </button>
    </div>
  );
}
