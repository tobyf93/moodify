import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import configureStore from './redux/store';
import Main from './components/Main';
import Login from './containers/Login';
import Fetch from './containers/Fetch';
import Playlists from './containers/Playlists';

const targetEl = document.getElementById('app');
const store = configureStore();

// Stubs
var Moods = Main;

const NotFound = () => {
  return (<div>hello</div>);
}

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={Main}>
        <IndexRoute component={Login} />
        <Route path='fetch' component={Fetch} />
        <Route path='playlists' component={Playlists} />
        <Route path='moods' component={Moods} />
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>
), targetEl);
