import React from 'react';
import { Link } from 'react-router';

class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      draggingIndex: null
    };

    // BINDINGS
    this.updateState = this.updateState.bind(this);
  }

  updateState(obj) {
    this.setState(obj);
  }

  render() {
    return (
      <ul className="c-list">
        {this.props.posts.postsList.map((post, i) => {
          return (
            <li key={i}>
              <Link to={`/posts/${post.id}`}>
                {post.title}
              </Link>
            </li>
          );
        })}
      </ul>
    );
  }
}

PostList.propTypes = {
  // STATE
  posts: React.PropTypes.object
};


export default PostList;
