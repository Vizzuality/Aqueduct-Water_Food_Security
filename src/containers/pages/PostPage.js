import { connect } from 'react-redux';
import PostPage from '../../components/pages/PostPage';

import { getPost } from '../../actions/posts';

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, {
  getPost
})(PostPage);
