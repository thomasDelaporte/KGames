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
} from 'react-router-dom';
import { LoginPage, LobbyPage } from './pages';
import { useKGames } from './store';

function Component() {
  const {
    states: { state },
    actions: { dispatch },
  } = useKGames();

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!state.player && location.pathname !== '/') {
      dispatch({ type: 'set-login-redirection', path: location.pathname });
      history.push('/');
    }
  }, [location, state]);

  return (
    <>
      {!state.player && (
        <>
          <Switch>
            <Route path="/" component={LoginPage} />
            <Redirect to="/" />
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
