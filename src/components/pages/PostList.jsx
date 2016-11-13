import React from 'react';
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

  /**
   * UI EVENTS
   * - onClickListItem
  */
  onClickListItem(e) {
    const id = e.currentTarget.dataset.id;
    this.setState({
      active: parseInt(id, 0)
    });

    // Get current post
    this.props.getPost(id);
  }

  /**
   * MODAL EVENTS
   * - onCloseModal
  */
  onCloseModal() {
    this.setState({
      active: null
    });
  }

  render() {
    const active = this.state.active;
    const detail = this.props.posts.postsDetail[active];
    const loading = this.props.posts.postLoading;

    return (
      <ul className="c-list">
        {this.props.posts.postsList.map((post, i) => {
          return (
            <li
              key={i}
              data-id={post.id}
              onClick={this.onClickListItem}
            >
              {post.title}

              {/* Example of another Modal */}
              {(active === post.id) ?
                <Modal
                  isActive={active === post.id}
                  isLoading={loading}
                  onCloseModal={this.onCloseModal}
                >
                  {(detail) ?
                    <div>
                      <h2 style={{ textTransform: 'uppercase' }}>{detail.title}</h2>
                      <h3>{detail.id}</h3>
                      <div>
                        {detail.body}
                      </div>
                    </div>
                  : null}
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
  getPost: React.PropTypes.func
};


export default PostList;
