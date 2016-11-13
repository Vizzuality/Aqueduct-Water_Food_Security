import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '../../app';

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      className: props.className
    };

    // BINDINGS
    this.onClickClose = this.onClickClose.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      active: nextProps.active,
      className: nextProps.className
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.active) {
      if (!this.modalTarget) {
        this.modalTarget = document.createElement('div');
        this.modalTarget.id = '#modal';
        this.modalTarget.className = 'c-modal';
        document.body.appendChild(this.modalTarget);
      }
      return true;
    }
    // Set this.modalTarget to null to remove the modal child
    this.modalTarget = null;
    return false;
  }

  componentWillUpdate() {
    this._render();
  }

  componentDidUpdate() {
    setTimeout(() => {
      const active = (this.state.active) ? '-active' : '';
      const className = (this.state.className) ? this.state.className : '';
      this.modalTarget.className = `c-modal ${active} ${className}`;
    }, 10);
  }

  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  // UI EVENTS
  onClickClose() {
    this.setState({
      active: false,
      className: ''
    });

    // - onCloseModal:
    // Set this function on your Component declaration
    // if you want to handle the close in your child Component
    this.props.onCloseModal && this.props.onCloseModal();

    ReactDOM.unmountComponentAtNode(this.modalTarget);
    document.body.removeChild(this.modalTarget);
  }

  _render() {
    ReactDOM.render(
      <Provider store={store}>
        <div>
          <div className="modal-container">
            <button className="modal-close" onClick={this.onClickClose}>
              <svg className="c-icon -big"><use xlinkHref="#icon-cross" /></svg>
            </button>

            <div id="modal-loader" className="c-spinner">
              <div className="spinner-box">
                <div className="icon" />
              </div>
            </div>

            <div className="modal-content">
              {this.props.children}
            </div>
          </div>
          <area className="modal-backdrop" onClick={this.onClickClose} />
        </div>
      </Provider>, this.modalTarget
    );
  }

  render() {
    return <noscript />;
  }
}

Modal.propTypes = {
  // GLOBAL
  className: React.PropTypes.string,
  children: React.PropTypes.element,

  // Triggers
  onCloseModal: React.PropTypes.func
};


export default Modal;
