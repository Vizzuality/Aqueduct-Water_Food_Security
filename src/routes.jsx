import React from 'react';
import { connect } from 'react-redux';
import { IndexRoute, Router, Route } from 'react-router';

// Components
import App from 'containers/app/App';
import MapPage from 'containers/pages/MapPage';
import ComparePage from 'containers/pages/ComparePage';

// Routing actions
import { onEnterMapPage, onEnterComparePage } from 'actions/route';

const Routes = ({ history }) => (
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={MapPage} onEnter={onEnterMapPage} />
      <Route path="compare">
        <IndexRoute component={ComparePage} onEnter={onEnterComparePage} />
      </Route>
    </Route>
  </Router>
);

Routes.propTypes = {
  history: React.PropTypes.object
};

export default connect()(Routes);
