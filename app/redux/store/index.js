import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from '../reducers';

// Console logging for reducers.
// Logs: previous state, action, next state
const logger = createLogger({
  level: 'info',
  collapsed: true
});

// const applyStore = applyMiddleware(thunk, logger)(createStore);
const applyStore = applyMiddleware(logger)(createStore);

export default function configureStore(state) {
  const store = applyStore(reducer, state);
  return store;
}
