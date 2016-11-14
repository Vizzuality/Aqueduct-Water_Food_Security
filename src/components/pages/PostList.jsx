import React from 'react';
import Modal from '../common/Modal';
import Tooltip from '../common/Tooltip';

class PostList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: null,
      tooltip: null
    };

    this.onClickListItem = this.onClickListItem.bind(this);
    this.onMouseOverListItem = this.onMouseOverListItem.bind(this);
    this.onMouseLeaveListItem = this.onMouseLeaveListItem.bind(this);
    this.onMouseMoveListItem = this.onMouseMoveListItem.bind(this);

    this.onCloseModal = this.onCloseModal.bind(this);
    this.onCloseTooltip = this.onCloseTooltip.bind(this);
  }

  /**
   * UI EVENTS
   * - onClickListItem
   * - onMouseOverListItem
   * - onMouseLeaveListItem
   * - onMouseMoveListItem
  */
  onClickListItem(e) {
    const id = e.currentTarget.dataset.id;
    this.setState({
      active: parseInt(id, 0)
    });

    // Get current post
    this.props.getPost(id);
  }

  onMouseOverListItem(e) {
    const id = e.currentTarget.dataset.id;
    this.setState({
      tooltip: parseInt(id, 0),
      clientX: e.clientX,
      clientY: e.clientY
    });
  }

  onMouseLeaveListItem() {
    this.setState({ tooltip: null });
  }

  onMouseMoveListItem(e) {
    this.setState({
      clientX: e.clientX,
      clientY: e.clientY
    });
  }

  /**
   * MODAL EVENTS
   * - onCloseModal
  */
  onCloseModal() {
    this.setState({ active: null });
  }

  /**
   * TOOLTIP EVENTS
   * - onCloseModal
  */
  onCloseTooltip() {
    this.setState({ tooltip: null });
  }

  render() {
    const { active, tooltip, clientX, clientY } = this.state;
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
              onMouseOver={this.onMouseOverListItem}
              onMouseLeave={this.onMouseLeaveListItem}
              onMouseMove={this.onMouseMoveListItem}
            >
              {post.title}

              {/* Example of Tooltip */}
              {(tooltip === post.id) ?
                <Tooltip
                  isActive={tooltip === post.id}
                  isLoading={loading}
                  clientX={clientX}
                  clientY={clientY}
                  onCloseTooltip={this.onCloseTooltip}
                >
                  <div>
                    <p style={{ textTransform: 'uppercase' }}>{post.title}</p>
                  </div>
                </Tooltip>
              : null }


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
