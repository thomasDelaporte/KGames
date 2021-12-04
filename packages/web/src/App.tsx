import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Redirect,
  withRouter,
  useLocation,
  useHistory,
  useParams,
} from 'react-router-dom';
import { LoginPage, LobbyPage } from './pages';
import { useKGames } from './store';

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

function Component() {
  const {
    states: { state },
    actions: { dispatch },
  } = useKGames();

  const location = useLocation();
  const history = useHistory();

  const { loading, error, data } = useQuery<MeResponse>(ME);

  useEffect(() => {
    if (!loading && !error && data) {
      if (data.me) {
        dispatch({
          type: 'login',
          player: data.me,
        });
        if (location.pathname === '/') {
          history.push(`lobby/${data.me.lobby.id}`);
        } else {
          history.push(location.pathname);
        }
      }
    }
  }, [loading, error, data]);

  if (loading) return <p>Loading</p>;

  return (
    <>
      {!state.player && (
        <>
          <Switch>
            <Route path="/" component={LoginPage} />
            <Route path="/lobby/:id" component={App} />
          </Switch>
        </>
      )}

      {state.player && (
        <>
          <Route path="/lobby/:id" component={LobbyPage} />
        </>
      )}
    </>
  );
}

export const App = withRouter(Component);
