import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from '../reducers';

// Console logging for reducers.
// Logs: previous state, action, next state
const logger = createLogger({
  level: 'info',
  collapsed: true
});

// const applyStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const applyStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

export default function configureStore(state) {
  const store = applyStoreWithMiddleware(reducer, state);
  return store;
}
