import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import configureStore from './redux/store';
import App from './containers/App';

const targetEl = document.getElementById('app');
const store = configureStore();

// Stubs
var Login = App;
var Playlists = App;
var Moods = App;

const Fetch = () => {
  return (<div>this is fetch</div>);
}

const NotFound = () => {
  return (<div>hello</div>);
}

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Login} />
        <Route path='fetch' component={Fetch} />
        <Route path='playlists' component={Playlists} />
        <Route path='moods' component={Moods} />
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  </Provider>
), targetEl);
