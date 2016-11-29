import { connect } from 'react-redux';
import PostList from 'components/pages/PostList';

import { getPost } from 'actions/posts';

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, {
  getPost
})(PostList);
