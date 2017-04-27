import React from 'react';
import classnames from 'classnames';
import { dispatch } from 'main';
import ShareModal from 'containers/modal/ShareModal';
import { Icon, toggleModal } from 'aqueduct-components';

export default class ShareButton extends React.Component {
  toggleShareModal() {
    dispatch(toggleModal(true, {
      children: ShareModal
    }));
  }

  render() {
    const className = classnames({
      [this.props.className]: !!this.props.className
    });

    return (
      <button
        className={className}
        type="button"
        onClick={() => this.toggleShareModal()}
      >
        <Icon name="icon-share" />
      </button>
    );
  }
}


ShareButton.propTypes = {
  className: React.PropTypes.string
};
