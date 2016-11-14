import React from 'react';
import { connect } from 'react-redux';
import { IndexRoute, Router, Route } from 'react-router';

// Components
import App from 'containers/pages/App';
import PostsPage from 'containers/pages/PostsPage';


const Routes = ({ history }) => (
  <Router
    history={history}
  >
    <Route path="/" component={App}>
      <IndexRoute component={PostsPage} />
      <Route path="posts">
        <IndexRoute component={PostsPage} />
      </Route>
    </Route>
  </Router>
);

Routes.propTypes = {
  history: React.PropTypes.object
};

export default connect()(Routes);
