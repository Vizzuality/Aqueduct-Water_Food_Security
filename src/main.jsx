import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import thunk from 'redux-thunk';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import Modal from 'containers/ui/Modal';
import Tooltip from 'containers/ui/Tooltip';
import ModalSample from 'containers/ui/ModalSample';
import TooltipSample from 'containers/ui/TooltipSample';

import * as reducers from './reducers';
import Routes from './routes';

import './styles/index.scss';

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
    applyMiddleware(middlewareRouter, thunk),
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
    <div>
      {/* Tell the Router to use our enhanced history */}
      <Routes history={history} />
      <Modal />
      <Tooltip />
    </div>
  </Provider>,
  document.getElementById('main')
);
