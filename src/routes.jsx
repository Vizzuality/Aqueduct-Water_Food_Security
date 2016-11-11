import React from 'react';
import { connect } from 'react-redux';
import { IndexRoute, Router, Route } from 'react-router';
import App from './containers/pages/App';
import PostsPage from './containers/pages/PostsPage';
import PostPage from './containers/pages/PostPage';


const Routes = ({ history }) => (
  <Router
    history={history}
  >
    <Route path="/" component={App}>
      <IndexRoute component={PostsPage} />
      <Route path="posts">
        <IndexRoute component={PostsPage} />
        <Route path=":id" component={PostPage} />
      </Route>
    </Route>
  </Router>
);

Routes.propTypes = {
  history: React.PropTypes.object
};

export default connect()(Routes);
