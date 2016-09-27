import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Main from '../components/Main';
import Login from '../containers/Login';
import Fetch from '../containers/Fetch';
import Playlists from '../containers/Playlists';
import MoodList from '../containers/MoodList';

const NotFound = () => {
  return (<div>Page not found</div>);
}

// TODO:
// onEnter={(nextState, replace) => {
//       if (!store.getState().isLoggedIn) {
//         return replace('/login')
//       }
const createRoutes = (store) => {
  const enterFetch = (nextState, replace) => {
    if (!store.getState().userDetails.loggedIn) {
      return replace('/');
    }
  };

  const enterPlaylists = (nextState, replace) => {
    if (!store.getState().playlists.length) {
      return replace('/fetch');
    }
  };

  const enterMoods = (nextState, replace) => {
    let moodsLength = Object.keys(store.getState().moods).length;

    if (!moodsLength) {
      return replace('/playlists');
    }
  };

  return (
    <Route path='/' component={Main}>
      <IndexRoute component={Login} />
      <Route path='fetch' onEnter={enterFetch} component={Fetch} />
      <Route path='playlists' onEnter={enterPlaylists} component={Playlists} />
      <Route path='moods' onEnter={enterMoods} component={MoodList} />
      <Route path='*' component={NotFound} />
    </Route>
  );
};

export default createRoutes;
