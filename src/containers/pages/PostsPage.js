import { connect } from 'react-redux';
import PostsPage from '../../components/pages/PostsPage';

import { getPosts } from '../../actions/posts';

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, {
  getPosts
})(PostsPage);
