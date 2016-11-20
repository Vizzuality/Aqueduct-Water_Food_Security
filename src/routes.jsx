import React from 'react';
import { connect } from 'react-redux';
import { IndexRoute, Router, Route } from 'react-router';

// Components
import App from 'containers/pages/App';
import AppPage from 'containers/pages/AppPage';

// Routing actions
import { updateMapParams } from 'actions/route';

const Routes = ({ history }) => (
  <Router
    history={history}
  >
    <Route path="/(:zoom)(/:lat)(/:lng)" component={App}>
      <IndexRoute component={AppPage} onEnter={updateMapParams} />
      <Route path="posts">
        <IndexRoute component={AppPage} />
      </Route>
    </Route>
  </Router>
);

Routes.propTypes = {
  history: React.PropTypes.object
};

export default connect()(Routes);
