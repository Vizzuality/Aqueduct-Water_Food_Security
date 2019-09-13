import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';

import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// es6 shim for .finally() in promises
import finallyShim from 'promise.prototype.finally';

// utils
import { initGA, logPageView } from 'utils/analytics';

import * as reducers from './reducers';
import Routes from './routes';

import './styles/index.scss';

finallyShim.shim();

/**
 * Reducers
 * @info(http://redux.js.org/docs/basics/Reducers.html)
 * @type {Object}
 */
const reducer = combineReducers({
  ...reducers,
  routing: routerReducer
});

/**
 * Global state
 * @info(http://redux.js.org/docs/basics/Store.html)
 * @type {Object}
 */
const middlewareRouter = routerMiddleware(hashHistory);
const store = createStore(
  reducer,
  composeWithDevTools(
    /* The router middleware MUST be before thunk otherwise the URL changes
    * inside a thunk function won't work properly */
    applyMiddleware(middlewareRouter, thunk)
  )
);

// Export dispatch funcion for dispatching actions outside connect
function dispatch(action) {
  store.dispatch(action);
}

/**
 * HTML5 History API managed by React Router module
 * @info(https://github.com/reactjs/react-router/tree/master/docs)
 * @type {Object}
 */
const history = syncHistoryWithStore(hashHistory, store);

export { store, history, dispatch };

// Google Analytics
// process.env.NODE_ENV === 'production' && ReactGA.initialize(process.env.GA);

// Google Analytics
if (!window.GA_INITIALIZED) {
  initGA();
  window.GA_INITIALIZED = true;
}
logPageView();


render(
  <Provider store={store}>
    {/* Tell the Router to use our enhanced history */}
    <Routes history={history} />
  </Provider>,
  document.getElementById('app')
);
