import React from 'react';
import { Link } from 'react-router';
import Modal from '../common/Modal';

class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: null
    };

    this.onClickListItem = this.onClickListItem.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  onClickListItem(e) {
    this.setState({
      active: parseInt(e.currentTarget.dataset.key, 0)
    });

    // this.state.active != null && this.props.getPost(this.state.active);
  }

  /**
   * CHILDREN EVENTS
   * - onCloseModal
  */
  onCloseModal() {
    this.setState({
      active: null
    });
  }

  render() {
    const active = this.state.active;
    return (
      <ul className="c-list">
        {this.props.posts.postsList.map((post, i) => {
          return (
            <li
              key={i}
              data-key={i}
              onClick={this.onClickListItem}
            >
              {post.title}

              {/* Example of another Modal */}
              {(active === i) ?
                <Modal
                  active={active === i}
                  onCloseModal={this.onCloseModal}
                >
                  <div>
                    <h2 style={{ textTransform: 'uppercase' }}>{post.title}</h2>
                    <h3>{post.id}</h3>
                  </div>
                </Modal>
              : null }
            </li>
          );
        })}
      </ul>
    );
  }
}

PostList.propTypes = {
  // STATE
  posts: React.PropTypes.object,

  // ACTIONS
  // getPost: React.PropTypes.func
};


export default PostList;
