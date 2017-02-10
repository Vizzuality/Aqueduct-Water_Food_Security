import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import initOpbeat from 'opbeat-react';
import 'opbeat-react/router';
import { createOpbeatMiddleware } from 'opbeat-react/redux';

import * as reducers from './reducers';
import Routes from './routes';

import 'leaflet/dist/leaflet.css';
import './styles/index.scss';

/**
 * Monitoring
 */
if (config.opbeatOrgId && config.opbeatAppId) {
  initOpbeat({
    orgId: config.opbeatOrgId,
    appId: config.opbeatAppId
  });
}

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
const middlewareRouter = routerMiddleware(browserHistory);
export const store = createStore(
  reducer,
  compose(
    /* The router middleware MUST be before thunk otherwise the URL changes
    * inside a thunk function won't work properly */
    applyMiddleware(middlewareRouter, thunk, createOpbeatMiddleware()),
    /* Redux dev tool, install chrome extension in
     * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en */
    typeof window === 'object' &&
      typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )
);

// Export dispatch funcion for dispatching actions outside connect
export function dispatch(action) {
  store.dispatch(action);
}

/**
 * HTML5 History API managed by React Router module
 * @info(https://github.com/reactjs/react-router/tree/master/docs)
 * @type {Object}
 */
export const history = syncHistoryWithStore(browserHistory, store);

// Google Analytics
// process.env.NODE_ENV === 'production' && ReactGA.initialize(process.env.GA);

render(
  <Provider store={store}>
    {/* Tell the Router to use our enhanced history */}
    <Routes history={history} />
  </Provider>,
  document.getElementById('app')
);
