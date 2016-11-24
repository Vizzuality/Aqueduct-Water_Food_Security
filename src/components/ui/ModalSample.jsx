import React from 'react';

export default class ModalSample extends React.Component {

  constructor(props) {
    super(props);
    // Bindings
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.props.openModal({
      children: ModalSample,
      childrenProps: {
        name: 'PERET'
      }
    });
    this.props.modalLoading();
    setTimeout(this.props.modalReady, 3000);
  }

  hideModal() {
    this.props.closeModal();
  }

  render() {
    return (
      <div>
        <h2>Hello, my name is {this.props.name}!</h2>
        <button type="button" onClick={this.showModal}>Show modal!</button>
        <button type="button" onClick={this.hideModal}>Hide modal!</button>
      </div>
    );
  }
}

ModalSample.propTypes = {
  // STORE
  openModal: React.PropTypes.func,
  closeModal: React.PropTypes.func,
  modalLoading: React.PropTypes.func,
  modalReady: React.PropTypes.func,
  name: React.PropTypes.string
};
