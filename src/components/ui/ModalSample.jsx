import React from 'react';

export default class ModalSample extends React.Component {

  constructor(props) {
    super(props);
    // Bindings
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  showModal() {
    this.props.toggleModal(true, {
      children: ModalSample,
      childrenProps: {
        name: 'PERET'
      }
    });
    this.props.modalLoading(true);
    setTimeout(() => {
      return this.props.modalLoading(false);
    }, 500);
  }

  hideModal() {
    this.props.toggleModal(false);
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
  toggleModal: React.PropTypes.func,
  modalLoading: React.PropTypes.func,
  name: React.PropTypes.string
};
