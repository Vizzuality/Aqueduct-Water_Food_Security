import React from 'react';
import Icon from 'components/ui/Icon';
import Spinner from 'components/ui/Spinner';

export default class Modal extends React.Component {
  // Close modal when esc key is pressed
  componentWillReceiveProps({ modal }) {
    const self = this;
    function escKeyPressListener(evt) {
      return evt.keyCode === 27 && self.props.toggleModal(false);
    }
    // if opened property has changed
    if (this.props.modal.opened !== modal.opened) {
      document[modal.opened ? 'addEventListener' : 'removeEventListener']('keydown', escKeyPressListener);
    }
  }
  getContent() {
    return this.props.modal.children ? <this.props.modal.children {...this.props.modal.childrenProps} /> : null;
  }
  render() {
    return (
      <section className={`c-modal ${this.props.modal.opened ? '' : '-hidden'}`}>
        <div className="modal-container">
          <button className="modal-close" onClick={() => this.props.toggleModal(false)}>
            <Icon name="icon-cross" />
          </button>
          <div className="modal-content">
            {this.props.modal.loading ? <Spinner isLoading /> : this.getContent()}
          </div>
        </div>
        <area className="modal-backdrop" />
      </section>
    );
  }
}

Modal.propTypes = {
  // STORE
  modal: React.PropTypes.object,
  // ACTIONS
  toggleModal: React.PropTypes.func
};
