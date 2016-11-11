import React from 'react';

import PostList from './PostList';

class PostsPage extends React.Component {

  componentWillMount() {
    this.props.getPosts();
  }

  render() {
    console.log(this.props.posts);
    return (
      <div>
        {this.props.posts.postsLoading && 'loading...'}
        <PostList posts={this.props.posts} />
      </div>
    );
  }
}

PostsPage.propTypes = {
  // STATE
  posts: React.PropTypes.object,

  // ACTIONS
  getPosts: React.PropTypes.func
};


export default PostsPage;
