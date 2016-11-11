import React from 'react';

class PostPage extends React.Component {

  componentWillMount() {
    this.props.getPost(this.props.params.id);
  }

  render() {
    return (
      <div>
        {this.props.posts.postLoading && 'loading...'}
        <h2>{this.props.posts.postsDetail.title}</h2>
        <p>{this.props.posts.postsDetail.body}</p>
      </div>
    );
  }
}

PostPage.propTypes = {
  // STATE
  posts: React.PropTypes.object,
  params: React.PropTypes.shape,

  // ACTIONS
  getPost: React.PropTypes.func
};


export default PostPage;
