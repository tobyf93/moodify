import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import configureStore from './redux/store';
import createRoutes from './routes';

const targetEl = document.getElementById('app');
const store = configureStore();
const routes = createRoutes(store);

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory} routes={routes}/>
  </Provider>
), targetEl);

// ReactDOM.render((
//   <Provider store={store}>
//     <Router history={hashHistory}>
//       <Route path='/' component={Main}>
//         <IndexRoute component={Login} />
//         <Route path='fetch' component={Fetch} />
//         <Route path='playlists' component={Playlists} />
//         <Route path='moods' component={MoodList} />
//         <Route path='*' component={NotFound} />
//       </Route>
//     </Router>
//   </Provider>
// ), targetEl);
